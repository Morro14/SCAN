import { Outlet } from "react-router";
import img from "../../media/auth-img.svg";
import imgLock from "../../media/auth-lock-img.svg";
import AuthTab from "~/components/auth/AuthTab";

export default function AuthLayout() {
	return (
		<div className="flex md:flex-row flex-col">
			<div className="md:mt-[69px] mt-[31px]">
				<div className="black md:text-xl text-[22px] md:w-[724px] md:h-[144px] md:leading-[46px]">
					<div className="md:static hidden">
						Для оформления подписки <br />
						на тариф, необходимо авторизоваться.
					</div>
					<div className="md:hidden">
						Для оформления <br />
						подписки <br />
						на тариф, необходимо <br />
						авторизоваться.
					</div>
				</div>
				<img
					src={img}
					alt="img-auth"
					className="md:static hidden w-[322px] ml-[112px] mt-[14px]"
				/>
			</div>
			<div className="h-[126px]"></div>
			<div className="md:flex md:static relative md:justify-end md:mt-[69px] md:mr-[81px]">
				<img
					src={imgLock}
					alt="img-lock"
					className="absolute md:left-[24px] md:top-[-55px] w-[75px] h-[92px] right-[180px] top-[-84px]"
				/>

				<div className="shadowed md:min-w-[429px] md:w-[429px] w-[335px] md:h-[523px] h-[504px] rounded-[10px] md:p-[25px] p-[15px]">
					<AuthTab></AuthTab>
					<Outlet></Outlet>
				</div>
				<img
					src={img}
					alt="img-auth"
					className="md:hidden w-[335px] mt-[49px]"
				/>
			</div>
		</div>
	);
}
