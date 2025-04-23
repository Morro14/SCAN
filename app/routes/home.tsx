import type { Route } from "./+types/home";
import Header from "../components/Header";
import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import CotnextProvider from "~/components/ContextProvider";
import { isRouteErrorResponse, useRouteError } from "react-router";
import AuthProvider from "~/components/AuthProvider";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import { selectAuth, authReducer } from "~/redux/authSlice";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  // getting auth info from storage
  useEffect(() => {
    if (auth !== "true" && sessionStorage.getItem("token")) {
      if (sessionStorage.getItem("username")) {
        dispatch(
          authReducer({
            auth: "true",
            token: sessionStorage.getItem("token"),
            username: sessionStorage.getItem("username"),
          })
        );
      } else {
        dispatch(
          authReducer({ auth: "true", token: sessionStorage.getItem("token") })
        );
      }
    } else if (auth !== "true" && !sessionStorage.getItem("token")) {
      sessionStorage.clear();
      dispatch(authReducer({ auth: "false" }));
    } else if (auth === "true" && !sessionStorage.getItem("username")) {
      dispatch(authReducer({ username: sessionStorage.getItem("username") }));
    }
  }, []);

  return (
    <>
      <CotnextProvider>
        <div className="flex flex-col justify-between items-center min-h-screen bg-gray-100">
          <div className="flex flex-col max-w-[1440px] min-w-[1440px] min-h-screen">
            <Header></Header>

            <main className="pl-[60px] pr-[60px] bg-white pb-[206px] grow">
              <Outlet></Outlet>
            </main>
            <Footer></Footer>
          </div>
        </div>
      </CotnextProvider>
    </>
  );
}
