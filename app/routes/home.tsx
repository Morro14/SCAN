import type { Route } from "./+types/home";
import Header from "../components/Header";
import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import CotnextProvider from "~/components/ContextProvider";
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
          <div className="flex flex-col max-w-[1440px]">
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
