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
			<label>{label}</label>
			<div>
				<select name={name}>
					{selectOpt.map((opt) => {
						optCount += 1;
						return <option key={"opt-" + optCount}>{opt}</option>;
					})}
				</select>
			</div>
		</div>
	);
}
