import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useGlobalContext } from "../ContextProvider";
import { isFormInvalid } from "../form/utils";
import { findErrors } from "../form/utils";
import InputError from "../form/InputError";

export default function SearchDates({ validation }: { validation: any }) {
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
		context.setSearchData({
			...context.searchData,
			[name]: e.target.value.length > 0,
		});
	};
	return (
		<div>
			<div className="flex flex-row items-end mt-[4px]">
				<div className="mr-[20px]">
					<div className="flex flex-row items-end">
						<label className="text-lg ">Диапазон поиска</label>
						<div className="text-[25px]">*</div>
					</div>
					<input
						type="text"
						placeholder="Дата начала"
						id="date-start"
						className="w-[176px] h-[43px] pl-[17px] rounded-[5px] shadow-[0_0_18px_0] shadow-[#0000000D] border-1 border-[#C7C7C7] mt-[12px]"
						{...register("dateStart", validation)}
						onChange={(e) => handleChange(e, "dateStart")}
					/>
				</div>

				<input
					type="text"
					placeholder="Дата конца"
					id="date-end"
					className="w-[176px] h-[43px] pl-[17px] rounded-[5px] shadow-[0_0_18px_0] shadow-[#0000000D] border-1 border-[#C7C7C7] mt-[12px]"
					{...register("dateEnd", validation)}
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
