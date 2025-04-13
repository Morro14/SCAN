import "../../styles/checkbox.css";
import tick from "../../media/tick.svg";
import { useFormContext } from "react-hook-form";

export default function Checkbox({
	name,
	label,
}: {
	name: string;
	label: string;
}) {
	const { register } = useFormContext();
	return (
		<div className="checkbox-container flex flex-row mt-[13px]">
			<input
				type="checkbox"
				className="inpt mr-[7px]"
				{...register(name)}
			/>
			<span>
				<div className="checkbox">
					<img
						src={tick}
						alt="tick-img"
						className="img"
					/>
				</div>
			</span>

			<label className="ml-[37px]">{label}</label>
		</div>
	);
}
