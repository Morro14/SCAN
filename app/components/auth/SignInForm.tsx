import { Form } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import { loginValidator } from "./validators";

import { useStore } from "react-redux";
import { useState } from "react";
import { useGlobalContext } from "../ContextProvider";

export default function SignInForm() {
	let buttonOpacity = " opacity-50";
	let buttonFunc = () => {};
	const methods = useForm();
	const context = useGlobalContext();
	const onSubmit = methods.handleSubmit((formData) => {
		console.log("submitting", formData);
	});
	try {
		if (context?.authData.login && context?.authData.password) {
			buttonOpacity = "";
			buttonFunc = onSubmit;
		} else {
			buttonOpacity = " opacity-50";
			buttonFunc = () => {};
		}
	} catch (error) {
		console.log("No Refs");
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
							name="login"
							label="Логин или номер телефона:"
							placeholder=""
							validation={loginValidator}
						></Input>
					</div>
					<div>
						<Input
							name="password"
							label="Пароль:"
							placeholder=""
							validation={loginValidator}
						></Input>
					</div>
					<button
						className={
							"btn mt-[7px] w-[379px] h-[59px] bg-blue-501 text-white font-medium text-[22px] rounded-[5px]" +
							buttonOpacity
						}
						onClick={buttonFunc}
					>
						Войти
					</button>
				</Form>
			</FormProvider>
		</div>
	);
}
