import { NavLink } from "react-router";
import headerLogoGreen from "../media/logo_resized.png";
import headerLogoWhite from "../media/header-logo-white.svg";
import { useEffect, useState, type JSX, type ReactNode } from "react";
import { useNavigate } from "react-router";
import HeaderInfo from "./HeaderInfo";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import { selectUsername, authReducer, selectAuth } from "~/redux/authSlice";
import getUserInfo from "~/requests/userInfo";
import Spinner from "./util/Spinner";

export default function Header() {
	const auth = useAppSelector(selectAuth);
	const username = useAppSelector(selectUsername);
	const dispatch = useAppDispatch();
	const [mobTab, showMobTab] = useState(false);
	const [userInfo, setUserInfo] = useState<null | {
		count: number;
		limit: number;
	}>(null);

	const [loadingUserInfo, setLoadingUserInfo] = useState(true);
	const [loadingLogout, setLoadingLogout] = useState(false);

	useEffect(() => {
		// trying to get username from storage
		if (!username && sessionStorage?.getItem("username")) {
			dispatch(authReducer({ username: sessionStorage?.getItem("username") }));
		}
		// getting user info
		if (userInfo === null && auth === "true" && loadingUserInfo) {
			getUserInfo_();
		}
	}, [loadingUserInfo, auth]);

	const nav = useNavigate();

	async function getUserInfo_() {
		const response = await getUserInfo();
		if (response) {
			setUserInfo({
				count: response.eventFiltersInfo.usedCompanyCount,
				limit: response.eventFiltersInfo.companyLimit,
			});
		}
		setLoadingUserInfo(false);
	}
	function handleLogout() {
		sessionStorage.clear();
		setLoadingLogout(true);
		// timeout for responsiveness
		setTimeout(() => {
			showMobTab(false);
			setLoadingLogout(false);
			dispatch(
				authReducer({
					token: null,
					username: null,
					expire: null,
					auth: "false",
				})
			);
			nav("/");
		}, 500);
	}
	const handleLogin = () => {
		showMobTab(false);
		nav("signin");
	};
	const placeholder = (
		<div className="flex justify-center items-center grow h-[100%] bg-gray-300 rounded-[5px]">
			<Spinner></Spinner>
		</div>
	);
	function navMobHandle() {
		// close mobile menu tab on nav click
		showMobTab(false);
	}
	console.log("header auth", auth);
	return (
		<div>
			<div
				className="absolute flex justify-end w-[375px] h-[491px] md:hidden"
				style={{ pointerEvents: mobTab ? "auto" : "none" }}
			>
				<div
					className="flex flex-col items-center relative transition-all duration-300 h-full bg-viridian-500 z-80"
					style={{ width: mobTab ? "375px" : "0px", opacity: mobTab ? 100 : 0 }}
				>
					<div
						className="h-[109px] mt-[138px] flex flex-col justify-between items-center transition-all duration-300"
						style={{ opacity: mobTab ? 100 : 0 }}
					>
						<NavLink
							to={"/"}
							className="text-white text-lg"
							onClick={navMobHandle}
						>
							Главная
						</NavLink>
						<NavLink
							to={"/"}
							className="text-white text-lg"
							onClick={navMobHandle}
						>
							Тарифы
						</NavLink>
						<NavLink
							to={"/"}
							className="text-white text-lg"
							onClick={navMobHandle}
						>
							FAQ
						</NavLink>
					</div>
					<div className="opacity-40 mt-[75px] text-white">
						Зарегистрироваться
					</div>
					<button
						className="btn flex justify-center items-center bg-viridian-501 w-[295px] h-[52px] mt-[21px] transition-all duration-300 md:hidden"
						style={{ opacity: mobTab ? 100 : 0 }}
						onClick={auth === "true" ? handleLogout : handleLogin}
					>
						{loadingLogout ? (
							<Spinner></Spinner>
						) : auth === "true" ? (
							"Выйти"
						) : (
							"Войти"
						)}
					</button>
				</div>
			</div>
			<header className="relative flex flex-row items-center justify-between h-[93px]">
				<div className="flex content-center ml-[14px] w-[111px]">
					{
						<div className="relative">
							<img
								src={headerLogoGreen}
								className="object-contain transition-all duration-300"
								style={{ opacity: !mobTab ? 100 : 0 }}
							></img>
							<img
								src={headerLogoWhite}
								className="absolute top-[-24px] object-contain transition-all duration-300"
								style={{ opacity: mobTab ? 100 : 0, zIndex: mobTab ? 100 : 0 }}
							></img>
						</div>
					}
				</div>
				<div className="flex flex-row justify-between md:w-[778px] items-center mr-[26px]">
					<div className="hidden md:flex content-center justify-between w-[236px] h-fit text-[14px]">
						<NavLink
							to={"/"}
							className="hover:underline"
						>
							Главная
						</NavLink>
						<NavLink
							to={"/"}
							className="hover:underline"
						>
							Тарифы
						</NavLink>
						<NavLink
							to={"/"}
							className="hover:underline"
						>
							FAQ
						</NavLink>
					</div>
					<div className="flex-row justify-end w-[430px] items-center hidden md:flex">
						{auth === "true" ? (
							<HeaderInfo
								data={userInfo}
								opacity={mobTab ? 0 : 100}
							></HeaderInfo>
						) : (
							""
						)}
						{auth === "true" ? (
							<ProfileGroup
								username={username}
								logoutFunc={handleLogout}
							/>
						) : auth === "pending" ? (
							placeholder
						) : (
							<LoginGroup loginFunc={handleLogin}></LoginGroup>
						)}
					</div>
					<div className="flex items-center md:hidden">
						{auth === "true" ? (
							<HeaderInfo
								data={userInfo}
								opacity={mobTab ? 0 : 100}
							></HeaderInfo>
						) : (
							""
						)}
						<div className="ml-[31px] z-100">
							<HeaderMenu
								showFunc={showMobTab}
								showState={mobTab}
							/>
						</div>
					</div>
				</div>
			</header>
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

export function HeaderMenu({
	showFunc,
	showState,
}: {
	showFunc: any;
	showState: boolean;
}) {
	function handleClick() {
		showFunc(showState ? false : true);
	}
	return (
		<div className="">
			<div
				className="flex flex-col justify-between hover:opacity-90 hover:cursor-pointer w-[30px] h-[25px]"
				onClick={handleClick}
			>
				<div
					className="w-full h-[5px] bg-viridian-500 transition-all  duration-300"
					style={
						showState
							? {
									opacity: 0,
							  }
							: {}
					}
				></div>
				<div
					className="w-full h-[5px] bg-viridian-500 transition-all  duration-300"
					style={
						showState
							? {
									transform: "rotate(45deg)",
									backgroundColor: "white",
									bottom: "0px",
							  }
							: {}
					}
				></div>
				<div
					className="w-full h-[5px] bg-viridian-500 relative transition-all duration-300"
					style={
						showState
							? {
									transform: "rotate(135deg)",
									backgroundColor: "white",
									bottom: "10px",
							  }
							: { bottom: "0px" }
					}
				></div>
			</div>
		</div>
	);
}
