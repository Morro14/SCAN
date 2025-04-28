import img from "../../media/spinner.svg";

export default function Spinner() {
	return (
		<div className="flex justify-center w-full">
			<img
				src={img}
				alt=""
				className="animate-spin"
			/>
		</div>
	);
}
