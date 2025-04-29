import type { Route } from "./+types/home";
import Header from "../components/Header";
import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import CotnextProvider from "~/components/ContextProvider";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import { selectAuth, authReducer } from "~/redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const auth = useAppSelector(selectAuth);
	const nav = useNavigate();
	function logout() {
		sessionStorage.clear();

		dispatch(
			authReducer({
				token: null,
				username: null,
				expire: null,
				auth: "false",
			})
		);
		nav("/signin");
	}

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

	axios.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			console.log(error);
			if (error.response.data.errorCode === "Auth_InvalidAccessToken") {
				logout();
			} else {
				return Promise.reject(error);
			}
		}
	);
	return (
		<>
			<CotnextProvider>
				<div className="flex flex-col justify-between items-center min-h-screen ">
					<div className="flex flex-col max-w-[1440px] md:min-w-[1440px] min-w-[375px] w-[375px] min-h-screen">
						<Header></Header>

						<main className="md:pl-[60px] pl-[14px] md:pr-[60px] pr-[26px] bg-white md:pb-[206px] pb-[43px] grow">
							<Outlet></Outlet>
						</main>
						<Footer></Footer>
					</div>
				</div>
			</CotnextProvider>
		</>
	);
}
