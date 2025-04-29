import { useFormContext } from "react-hook-form";
import { useGlobalContext } from "../ContextProvider";
import { isFormInvalid } from "../form/utils";
import { findErrors } from "../form/utils";
import { dateEndValidator, dateStartValidator } from "../form/validators";
import { useState } from "react";

export default function SearchDates() {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const context: any = useGlobalContext();

	const isInvalid: boolean = isFormInvalid(errors);
	const inputErrors = {
		dateStart: findErrors(errors, "dateStart"),
		dateEnd: findErrors(errors, "dateEnd"),
	};
	const handleChange = (e: any, name: string) => {
		if (styleStart === inputErrorStyle) {
			setStyleStart(inputStyle);
		}
		if (styleEnd === inputErrorStyle) {
			setStyleEnd(inputStyle);
		}
		context.setSearchInputs({
			...context.searchInputs,
			[name]: e.target.value.length > 0,
		});
	};
	// set input borders style when input is not validated
	const inputErrorStyle =
		"md:w-[176px] w-[335px] h-[43px] pl-[17px] rounded-[5px] shadow-[0_0_18px_0] shadow-[#0000000D] border-1 mt-[12px] text-red-501 border-red-501";
	const inputStyle =
		"md:w-[176px] w-[335px] h-[43px] pl-[17px] rounded-[5px] shadow-[0_0_18px_0] shadow-[#0000000D] border-1 border-[#C7C7C7] mt-[12px] text-black";
	const [styleStart, setStyleStart] = useState(inputStyle);
	const [styleEnd, setStyleEnd] = useState(inputStyle);
	if (isInvalid) {
		if (
			context?.validatingForm["dateStart"] &&
			inputErrors.dateStart.error &&
			styleStart === inputStyle
		) {
			setStyleStart(inputErrorStyle);
			context.setValidatingForm({
				...context.validatingForm,
				["dateStart"]: false,
			});
		}
		if (
			context?.validatingForm["dateEnd"] &&
			inputErrors.dateEnd.error &&
			styleEnd === inputStyle
		) {
			setStyleEnd(inputErrorStyle);
			context.setValidatingForm({
				...context.validatingForm,
				["dateEnd"]: false,
			});
		}
	}
	// set input border back to normal on focus

	return (
		<div>
			<div className="flex md:flex-row flex-col md:items-end mt-[4px]">
				<div className="mr-[20px]">
					<div className="flex flex-row items-end">
						<label className="text-lg ">Диапазон поиска</label>
						<div className="text-[25px]">*</div>
					</div>
					<input
						type="date"
						placeholder="Дата начала"
						id="date-start"
						className={styleStart}
						{...register("dateStart", dateStartValidator as any)}
						onChange={(e) => handleChange(e, "dateStart")}
					/>
				</div>

				<input
					type="date"
					placeholder="Дата конца"
					id="date-end"
					className={styleEnd}
					{...register("dateEnd", dateEndValidator)}
					onChange={(e) => handleChange(e, "dateEnd")}
				/>
			</div>
			<div className="h-[26px]">
				{isInvalid &&
					(Object.keys(inputErrors.dateStart).length > 0 ||
						Object.keys(inputErrors.dateEnd).length > 0) && (
						<div className="flex justify-center">
							<InputError
								message={
									inputErrors.dateStart.error
										? inputErrors.dateStart.error
										: inputErrors.dateEnd.error
										? inputErrors.dateEnd.error
										: ""
								}
							></InputError>
						</div>
					)}
			</div>
		</div>
	);
}

export function InputError({ message }: { message: string }) {
	return <div className="text-[#FF5959] text-sm mt-[6px]">{message}</div>;
}
