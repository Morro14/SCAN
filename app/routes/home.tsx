import type { Route } from "./+types/home";
import Header from "../components/Header";
import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import CotnextProvider from "~/components/ContextProvider";
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();
  console.log("error bound", error);
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CotnextProvider>
        <div className="flex flex-col justify-between items-center h-full bg-gray-100">
          <div className="flex flex-col max-w-[1440px] min-w-[1440px]">
            <Header></Header>

            <main className="pl-[60px] pr-[60px] bg-white pb-[206px]">
              <Outlet></Outlet>
            </main>
            <Footer></Footer>
          </div>
        </div>
      </CotnextProvider>
    </>
  );
}
