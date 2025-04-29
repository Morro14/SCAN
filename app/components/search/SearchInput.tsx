import { useFormContext } from "react-hook-form";
import { findErrors, isFormInvalid } from "../form/utils";

import { useGlobalContext } from "../ContextProvider";
import { useState } from "react";

export default function SearchInput({
	name,
	label,
	placeholder,
	validation,
}: {
	name: "inn" | "limit";
	label: string;
	placeholder: string;
	validation: any;
}) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const context = useGlobalContext();

	const isInvalid: boolean = isFormInvalid(errors);
	const inputError = findErrors(errors, name);
	const handleChange = (e: any) => {
		if (style === inputErrorStyle) {
			setStyle(inputStyle);
		}
		context?.setSearchInputs({
			...context.searchInputs,
			[name]: e.target.value.length > 0,
		});
	};
	// set input borders style when input is not validated
	const inputErrorStyle =
		"md:w-[242px] w-[335px] h-[43px] pl-[17px] rounded-[5px] shadow-[0_0_18px_0] shadow-[#0000000D] border-1 mt-[12px] text-red-501 border-red-501";
	const inputStyle =
		"md:w-[242px] w-[335px] h-[43px] pl-[17px] rounded-[5px] shadow-[0_0_18px_0] shadow-[#0000000D] border-1 border-[#C7C7C7] mt-[12px]";
	const [style, setStyle] = useState(inputStyle);
	if (
		context?.validatingForm[name] &&
		isInvalid &&
		inputError.error &&
		style === inputStyle
	) {
		setStyle(inputErrorStyle);
		context.setValidatingForm({ ...context.validatingForm, [name]: false });
	}

	return (
		<div className="mt-[-6px]">
			<div className="flex flex-row items-end">
				<label className="text-lg ">{label}</label>
				<div className="text-[25px]">*</div>
			</div>
			<div className="flex flex-col justify-center">
				<div className="">
					<input
						type="text"
						placeholder={placeholder}
						{...register(name, validation)}
						className={style}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className="h-[26px] md:w-[242px]">
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
		</div>
	);
}

export function InputError({ message }: { message: string }) {
	return <div className="text-[#FF5959] text-sm mt-[6px]">{message}</div>;
}
