import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
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
				<Header></Header>
				<div className="pl-[60px] pr-[60px]">
					<Outlet></Outlet>
				</div>
				<Footer></Footer>
			</CotnextProvider>
		</>
	);
}
