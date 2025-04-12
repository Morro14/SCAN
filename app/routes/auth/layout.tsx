import { Outlet } from "react-router";
import img from "../../media/auth-img.svg";
import imgLock from "../../media/auth-lock-img.svg";
import AuthTab from "~/components/auth/AuthTab";

export default function AuthLayout() {
	return (
		<div className="flex flex-row">
			<div className="mt-[69px]">
				<div className="black text-[40px] w-[724px] h-[144px] leading-[46px]">
					Для оформления подписки <br />
					на тариф, необходимо авторизоваться.
				</div>
				<img
					src={img}
					alt="img-auth"
					className="w-[322px] ml-[112px] mt-[14px]"
				/>
			</div>
			<div className="flex justify-end mt-[69px] mr-[81px]">
				<img
					src={imgLock}
					alt="img-lock"
					className="relative left-[24px] top-[-55px] w-[75px] h-[92px]"
				/>
				<div className="shadowed min-w-[429px] w-[429px] h-[523px] rounded-[10px] p-[25px]">
					<AuthTab></AuthTab>
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
}
