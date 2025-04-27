import { useFormContext } from "react-hook-form";
import { findErrors, isFormInvalid } from "../form/utils";
import InputError from "./InputError";
import { useGlobalContext } from "../ContextProvider";
import { useForm } from "react-hook-form";
import { useEffect, useState, type ChangeEvent } from "react";

export default function Input({
	name,
	label,
	placeholder,
	validation,
	credsInvalid,
}: {
	name: string;
	label: string;
	placeholder: string;
	validation: any;
	credsInvalid: boolean;
}) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const context: any = useGlobalContext();
	const isInvalid: boolean = isFormInvalid(errors);
	const inputError = findErrors(errors, name);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		context.setAuthData({
			...context.authData,
			[name]: e.target.value.length > 0,
		});
	};

	return (
		<div className="mt-[-6px]">
			<label className="md:text-base text-sm text-[#949494] ">{label}</label>
			<div className="flex">
				<input
					type="text"
					placeholder={placeholder}
					{...register(name, validation)}
					className="w-[100%] h-[43px] rounded-[5px] shadow-[0_0_18px_0] shadow-[#0000000D] border-1 border-[#C7C7C7] mt-[12px]"
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className="h-[26px]">
				{credsInvalid ? (
					<InputError
						message={"Неверные данные"}
						key={"key-" + name}
					></InputError>
				) : (
					""
				)}
				{isInvalid && Object.keys(inputError).length > 0 && (
					<div className="flex justify-center">
						<InputError
							message={inputError.error ? inputError.error : ""}
							key={inputError.error}
						></InputError>
					</div>
				)}
			</div>
		</div>
	);
}
