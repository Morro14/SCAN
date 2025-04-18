import { useFormContext } from "react-hook-form";
import { findErrors, isFormInvalid } from "../form/utils";
import InputError from "../form/InputError";
import { useGlobalContext } from "../ContextProvider";

export default function SearchInput({
	name,
	label,
	placeholder,
	validation,
}: {
	name: string;
	label: string;
	placeholder: string;
	validation: any;
}) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const context: any = useGlobalContext();

	const isInvalid: boolean = isFormInvalid(errors);
	const inputError = findErrors(errors, name);
	const handleChange = (e: any) => {
		context.setSearchData({
			...context.searchData,
			[name]: e.target.value.length > 0,
		});
	};

	return (
		<div className="mt-[-6px]">
			<div className="flex flex-row items-end">
				<label className="text-lg ">{label}</label>
				<div className="text-[25px]">*</div>
			</div>
			<div className="flex">
				<input
					type="text"
					placeholder={placeholder}
					{...register(name, validation)}
					className="w-[242px] h-[43px] pl-[17px] rounded-[5px] shadow-[0_0_18px_0] shadow-[#0000000D] border-1 border-[#C7C7C7] mt-[12px]"
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className="h-[26px]">
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
