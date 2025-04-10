import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Header from "../components/Header";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header></Header>
			<div className="pl-[60px] pr-[60px]">
				<Outlet></Outlet>
			</div>
		</>
	);
}
