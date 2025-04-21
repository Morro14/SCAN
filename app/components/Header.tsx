import { NavLink } from "react-router";
import imgURL from "./media/logo_resized.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HeaderInfo from "./HeaderInfo";
import { useGlobalContext } from "./ContextProvider";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import { selectToken, authReducer } from "~/redux/authSlice";

export default function Header() {
  const auth = useAppSelector(selectToken);
  const context = useGlobalContext();
  const [username, setUsername] = useState<null | string>(null);
  const [loading, setLaoding] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!username && sessionStorage?.getItem("username")) {
      setUsername(sessionStorage?.getItem("username"));
      setLaoding(false);
    }
    setLaoding(false);
  });
  // const username = context?.username;
  const nav = useNavigate();
  function handleLogout() {
    sessionStorage.clear();
    setLaoding(true);
    dispatch(authReducer({ token: null }));
    nav("");
  }

  const loginButtonHandle = () => {
    nav("signin");
  };
  const placeholder = (
    <div className="flex grow bg-gray-300 rounded-[5px]"></div>
  );
  const loginGroup = (
    <div className="flex flex-row items-center ">
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

  const profileGroup = (
    <div className="flex items-start justify-end w-[240px]">
      <div className="flex flex-col items-end">
        <div className="text-sm">{username}</div>
        <div
          className="text-[10px] text-gray-950/40 hover:cursor-pointer"
          onClick={handleLogout}
        >
          Выйти
        </div>
      </div>
      <div className="h-[32px] w-[32px] bg-gray-300 rounded-full ml-[4px]"></div>
    </div>
  );

  return (
    <>
      <header className="flex flex-row items-center justify-between h-[93px] bg-white">
        <div className="flex content-center ml-[60px] w-[141px]">
          <img src={imgURL} className="object-contain"></img>
        </div>
        <div className="flex flex-row justify-between w-[778px] items-center mr-[60px]">
          <div className="flex content-center justify-between w-[236px] h-fit text-[14px]">
            <NavLink to="" className="hover:underline">
              Главная
            </NavLink>
            <NavLink to="" className="hover:underline">
              Тарифы
            </NavLink>
            <NavLink to="" className="hover:underline">
              FAQ
            </NavLink>
          </div>
          <div className="flex flex-row justify-end w-[430px] items-center">
            {auth && !loading ? (
              <HeaderInfo></HeaderInfo>
            ) : loading ? (
              placeholder
            ) : (
              ""
            )}
            {auth && !loading
              ? profileGroup
              : loading
              ? placeholder
              : loginGroup}
          </div>
        </div>
      </header>
    </>
  );
}
