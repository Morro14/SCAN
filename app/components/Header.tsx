import { NavLink } from "react-router";
import imgURL from "./media/logo_resized.png";
import { useStore } from "react-redux";
import { useState } from "react";
import type { RootState } from "~/redux/store";
import { useDispatch } from "react-redux";

export default function Header() {
	const [auth, setAuth] = useState(false);
	const store = useStore();
	const dispatch = useDispatch();
	console.log(store.getState());
	const storeData = store.getState() as RootState;
	const infoGroup = (
		<div className="flex justify-center flex-col w-[175px] h-[63px] bg-[#D9D9D9]/40 rounded-[5px] p-[8px]">
			<div className="flex flex-row items-center justify-end">
				<div className="text-[10px] text-gray-950/40 ">
					Использовано компаний
				</div>
				<div className="text-[14px] font-bold ml-[9px]">74</div>
			</div>
			<div className="flex flex-row items-center justify-end">
				<div className="text-[10px] text-gray-950/40 ">Лимит по компаниям</div>
				<div className="text-[14px] text-[#8AC540] font-bold ml-[9px]">100</div>
			</div>
		</div>
	);

	const loginButtonHandle = () => {
		setAuth(true);
		dispatch({
			type: "auth/authReducer",
			payload: { token: "token", username: "username" },
		});
	};

	const loginGroup = (
		<div className="flex flex-row items-center mr-[60px]">
			<div className="text-[14px] text-gray-950/40">Зарегистрироваться</div>
			<div className="w-[2px] h-[26px] bg-orange-501/60 ml-[18px] mr-[20px]"></div>
			<button
				className="btn bg-[#7CE3E1] rounded-[5px] font-medium text-[14px] w-[65px] h-[26px]"
				onClick={loginButtonHandle}
			>
				Войти
			</button>
		</div>
	);

	const username: string = storeData.auth.username;
	const logoutButtonHandle = () => {
		setAuth(false);
		dispatch({
			type: "auth/authReducer",
			payload: { token: "none", username: "none" },
		});
	};
	const profileGroup = (
		<div className="flex items-start mr-[60px] justify-end w-[240px]">
			<div className="flex flex-col items-end">
				<div className="text-sm">{username}</div>
				<div
					className="text-[10px] text-gray-950/40 hover:cursor-pointer"
					onClick={logoutButtonHandle}
				>
					Выйти
				</div>
			</div>
			<div className="h-[32px] w-[32px] bg-gray-300 rounded-full ml-[4px]"></div>
		</div>
	);

	let authGroup = <></>;
	let infoTab = <></>;
	if (auth) {
		authGroup = profileGroup;
		infoTab = infoGroup;
	} else {
		authGroup = loginGroup;
		infoTab = <></>;
	}
	return (
		<>
			<header className="flex flex-row items-center justify-between h-[93px]">
				<div className="flex content-center ml-[60px] w-[141px]">
					<img
						src={imgURL}
						className="object-contain"
					></img>
				</div>
				<div className="flex content-center justify-between w-[236px] h-fit text-[14px]">
					<NavLink to="">Главная</NavLink>
					<NavLink to="">Тарифы</NavLink>
					<NavLink to="">FAQ</NavLink>
				</div>
				<div className="flex flex-row items-center">
					{infoTab}
					{authGroup}
				</div>
			</header>
		</>
	);
}
