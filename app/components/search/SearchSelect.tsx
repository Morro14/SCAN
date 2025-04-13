export default function SearchSelect({
	name,
	label,
	selectOpt,
}: {
	name: string;
	label: string;
	selectOpt: Array<string>;
}) {
	let optCount = 0;
	return (
		<div>
			<div className="flex flex-row items-end">
				<label className="text-lg ">{label}</label>
				<div className="text-[25px]">*</div>
			</div>
			<div>
				<select
					name={name}
					className="w-[242px] h-[43px] pl-[17px] rounded-[5px] shadow-[0_0_18px_0] shadow-[#0000000D] border-1 border-[#C7C7C7] mt-[12px]"
				>
					{selectOpt.map((opt) => {
						optCount += 1;
						return (
							<option
								key={"opt-" + optCount}
								className=""
							>
								{opt}
							</option>
						);
					})}
				</select>
			</div>
			<div className="h-[26px]">
				{/* {isInvalid && Object.keys(inputError).length > 0 && (
					<div className="flex justify-center">
						<InputError
							message={inputError.error ? inputError.error : ""}
							key={inputError.error}
						></InputError>
					</div>
				)} */}
			</div>
		</div>
	);
}
