import { useLocation } from "react-router";
import { useNavigate } from "react-router";

export default function AuthTab() {
	const location = useLocation();
	const path = location.pathname;
	// const [authTab, setAuthTab] = useState(location.pathname);
	const navigate = useNavigate();
	const handleClick = (e: React.MouseEvent, path: "/signin" | "/signup") => {
		navigate(path);
	};
	const tabStyleActive = " border-viridian-500 text-viridian-500";
	const tabStyleNonactive = " border-[#C7C7C7] text-[#C7C7C7]";
	return (
		<div className="flex flex-row justify-between md:text-lg text-base">
			<button
				className={
					"flex justify-center items-start md:w-[151px] w-[103px] h-[29px] border-b-2" +
					(path === "/signin" ? tabStyleActive : tabStyleNonactive)
				}
				onClick={(e) => handleClick(e, "/signin")}
			>
				Войти
			</button>
			<button
				className={
					"flex justify-center items-start md:w-[213px] w-[182px] h-[29px] border-b-2" +
					(path === "/signup" ? tabStyleActive : tabStyleNonactive)
				}
				onClick={(e) => handleClick(e, "/signup")}
			>
				Зарегистрироваться
			</button>
		</div>
	);
}
