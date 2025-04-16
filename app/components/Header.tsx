import { NavLink } from "react-router";
import imgURL from "./media/logo_resized.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HeaderInfo from "./HeaderInfo";
import { useGlobalContext } from "./ContextProvider";

export default function Header() {
  const [username, setUsername] = useState<null | string>();
  const context = useGlobalContext();
  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
  });

  const nav = useNavigate();
  function handleLogout() {
    sessionStorage.clear();

    context?.setAuth(null);
    nav("");
    console.log(sessionStorage.getItem("token"));
  }

  const loginButtonHandle = () => {
    nav("signin");
  };

  const loginGroup = (
    <div className="flex flex-row items-center mr-[60px] ">
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
    <div className="flex items-start mr-[60px] justify-end w-[240px]">
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

  let authGroup = <></>;
  let infoTab = <></>;
  if (context?.auth) {
    authGroup = profileGroup;
    infoTab = <HeaderInfo></HeaderInfo>;
  } else {
    authGroup = loginGroup;
    infoTab = <></>;
  }
  return (
    <>
      <header className="flex flex-row items-center justify-between h-[93px] bg-white">
        <div className="flex content-center ml-[60px] w-[141px]">
          <img src={imgURL} className="object-contain"></img>
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
