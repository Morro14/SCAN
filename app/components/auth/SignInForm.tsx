import Spinner from "../util/Spinner";
import { Form } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import { loginValidator } from "../form/validators";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../ContextProvider";
import loginReq from "~/requests/login";
import { useState } from "react";
import { useAppDispatch } from "~/redux/hooks";
import { authReducer } from "~/redux/authSlice";

export default function SignInForm() {
	let buttonOpacity = " opacity-50 hover:opacity-100";

	const methods = useForm();
	const context = useGlobalContext();
	const nav = useNavigate();
	const [credsInvalid, setCredsInvalid] = useState(false);
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();

	const onSubmit = methods.handleSubmit(async (formData) => {
		dispatch(
			authReducer({
				auth: "pending",
			})
		);
		setLoading(true);
		const response = await loginReq(formData.username, formData.password);
		setLoading(false);
		if (!response.errorCode && response.status === 200) {
			sessionStorage.setItem("token", response.data.accessToken);
			sessionStorage.setItem("username", formData.username);

			dispatch(
				authReducer({
					token: response.data.accessToken,
					auth: "true",
					username: formData.username,
					redirect: "/",
				})
			);
			nav("/");
		} else {
			setCredsInvalid(true);
			setLoading(false);
		}
	});

	let buttonFunc: (
		e?: React.BaseSyntheticEvent<object, object, any>
	) => Promise<void> | void = onSubmit;
	try {
		if (context?.authData.username && context?.authData.password) {
			buttonOpacity = "";
			buttonFunc = onSubmit;
		} else {
			buttonOpacity = " opacity-50 hover:opacity-50!";
			buttonFunc = () => {};
		}
	} catch (error) {
		console.log(error);
	}

	return (
		<div>
			<FormProvider {...methods}>
				<Form
					onSubmit={(e) => e.preventDefault()}
					noValidate
				>
					<div className="mt-[40px]">
						<Input
							name="username"
							label="Логин или номер телефона:"
							placeholder=""
							validation={loginValidator}
							credsInvalid={credsInvalid}
						></Input>
					</div>
					<div>
						<Input
							name="password"
							label="Пароль:"
							placeholder=""
							validation={loginValidator}
							credsInvalid={credsInvalid}
						></Input>
					</div>
					<button
						className={
							"btn flex justify-center items-center mt-[7px] md:w-[379px] w-[305px] h-[59px] bg-blue-501 text-white font-medium md:text-[22px] text-[20px] rounded-[5px]" +
							buttonOpacity
						}
						onClick={buttonFunc}
					>
						{loading ? <Spinner></Spinner> : "Войти"}
					</button>
				</Form>
			</FormProvider>
		</div>
	);
}
