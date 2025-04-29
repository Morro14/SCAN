import SignInForm from "~/components/auth/SignInForm";
import authYandex from "../../media/auth-yandex.svg";
import authGoogle from "../../media/auth-google.svg";
import authFacebook from "../../media/auth-facebook.svg";
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<div>
				<h1 className="text-xl">
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</div>
		);
	} else if (error instanceof Error) {
		return (
			<div>
				<h1 className="text-2xl ">Ошибка</h1>
				<p>Что-то пошло не так</p>
				<p>{error.message}</p>
				{/* <p>The stack trace is:</p> */}
				{/* <pre>{error.stack}</pre> */}
			</div>
		);
	} else {
		return <h1>Unknown Error</h1>;
	}
}
export default function SignIn() {
	return (
		<div>
			<SignInForm></SignInForm>
			<div className="text-blue-501 underline mt-[10px] text-center md:text-base text-sm">
				Восстановить пароль
			</div>
			<div className="flex flex-col justify-between w-[308px] h-[65px] mt-[30px]">
				<div className="text-base text-[#949494]">Войти через:</div>
				<div className="flex flex-row mt-[15px]">
					<div className="flex justify-center items-center border-1 border-[#5970FF82] w-[96px] h-[31px] rounded-[3px] mr-[10px]">
						<img
							src={authGoogle}
							alt="auth-google"
						/>
					</div>
					<div className="flex justify-center items-center border-1 border-[#5970FF82] w-[96px] h-[31px] rounded-[3px] mr-[10px]">
						<img
							src={authFacebook}
							alt="auth-facebook"
						/>
					</div>
					<div className="flex justify-center items-center border-1 border-[#5970FF82] w-[96px] h-[31px] rounded-[3px] mr-[10px]">
						<img
							src={authYandex}
							alt="auth-yandex"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
