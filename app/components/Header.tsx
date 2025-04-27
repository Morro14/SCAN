import { NavLink } from "react-router";
import imgURL from "../media/logo_resized.png";
import { useEffect, useState, type JSX, type ReactNode } from "react";
import { useNavigate } from "react-router";
import HeaderInfo from "./HeaderInfo";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import { selectUsername, authReducer, selectAuth } from "~/redux/authSlice";

export default function Header() {
	const auth = useAppSelector(selectAuth);
	const username = useAppSelector(selectUsername);
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const [mobTab, showMobTab] = useState(false);

	useEffect(() => {
		console.log("effect");
		// trying to get username from storage
		if (!username && sessionStorage?.getItem("username")) {
			dispatch(authReducer({ username: sessionStorage?.getItem("username") }));
			setLoading(false);
		} else {
			setLoading(false);
		}
	}, [setLoading, loading]);

	const nav = useNavigate();

	function handleLogout() {
		sessionStorage.clear();
		setLoading(true);
		dispatch(
			authReducer({
				token: null,
				username: null,
				expire: null,
				auth: "pending",
			})
		);
		nav("/");
	}
	const handleLogin = () => {
		nav("signin");
	};
	const placeholder = (
		<div className="flex grow h-[100%] bg-gray-300 rounded-[5px]"></div>
	);
	const mobTabHeight = mobTab ? "60px" : "0px";

	return (
		<div>
			<header className="flex flex-row items-center justify-between h-[93px] bg-white">
				<div className="flex content-center ml-[14px] w-[111px]">
					<img
						src={imgURL}
						className="object-contain"
					></img>
				</div>
				<div className="flex flex-row justify-between md:w-[778px] items-center mr-[26px]">
					<div className="hidden md:flex content-center justify-between w-[236px] h-fit text-[14px]">
						<NavLink
							to={auth === "true" ? "/main/auth" : ""}
							className="hover:underline"
						>
							Главная
						</NavLink>
						<NavLink
							to={auth === "true" ? "/main/auth" : ""}
							className="hover:underline"
						>
							Тарифы
						</NavLink>
						<NavLink
							to={auth === "true" ? "/main/auth" : ""}
							className="hover:underline"
						>
							FAQ
						</NavLink>
					</div>
					<div className="flex-row justify-end w-[430px] items-center hidden md:flex">
						{auth === "true" ? <HeaderInfo></HeaderInfo> : ""}
						{auth === "true" && !loading ? (
							<ProfileGroup
								username={username}
								logoutFunc={handleLogout}
							/>
						) : auth !== "true" && !loading ? (
							<LoginGroup loginFunc={handleLogin}></LoginGroup>
						) : (
							placeholder
						)}
					</div>
					<div className="flex items-center md:hidden">
						{auth === "true" ? <HeaderInfo></HeaderInfo> : ""}
						<div className="ml-[31px]">
							<HeaderMenu
								auth={auth}
								username={username}
								loading={loading}
								placeholder={placeholder}
								handleLogin={handleLogin}
								handleLogout={handleLogout}
								showFunc={showMobTab}
								showState={mobTab}
							/>
						</div>
					</div>
				</div>
			</header>
			<div
				className="flex justify-end items-center pr-[26px] transition-all duration-150 bg-white md:hidden"
				style={{ height: mobTabHeight }}
			>
				{mobTab ? (
					auth === "true" && !loading ? (
						<ProfileGroup
							username={username}
							logoutFunc={handleLogout}
						/>
					) : auth !== "true" && !loading ? (
						<LoginGroup loginFunc={handleLogin}></LoginGroup>
					) : (
						<p>loading</p>
					)
				) : (
					""
				)}
			</div>
		</div>
	);
}

export function ProfileGroup({
	username,
	logoutFunc,
}: {
	username: string | null;
	logoutFunc: any;
}) {
	return (
		<div className="flex items-start justify-end w-[240px]">
			<div className="flex flex-col items-end">
				<div className="text-sm">{username}</div>
				<div
					className="text-[10px] text-gray-950/40 hover:cursor-pointer"
					onClick={logoutFunc}
				>
					Выйти
				</div>
			</div>
			<div className="h-[32px] w-[32px] bg-gray-300 rounded-full ml-[4px]"></div>
		</div>
	);
}

export function LoginGroup({ loginFunc }: { loginFunc: any }) {
	return (
		<div className="flex flex-row items-center ">
			<div className="text-[14px] text-gray-950/40">Зарегистрироваться</div>
			<div className="w-[2px] h-[26px] bg-orange-501/60 ml-[18px] mr-[20px]"></div>
			<button
				className="btn bg-[#7CE3E1] rounded-[5px] font-medium text-[14px] w-[65px] h-[26px]"
				onClick={loginFunc}
			>
				Войти
			</button>
		</div>
	);
}

import menuImg from "../media/header-menu-icon.svg";

export function HeaderMenu({
	showFunc,
	showState,
}: {
	auth: "true" | "false" | "pending";
	placeholder: ReactNode;
	username: string | null;
	loading: boolean;
	handleLogout: any;
	handleLogin: any;
	showFunc: any;
	showState: boolean;
}) {
	function handleClick() {
		showFunc(showState ? false : true);
	}
	return (
		<div className="">
			<div
				className="hover:opacity-90 hover:cursor-pointer"
				onClick={handleClick}
			>
				<img
					src={menuImg}
					alt=""
				/>
			</div>
		</div>
	);
}
