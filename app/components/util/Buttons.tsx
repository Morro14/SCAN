import Spinner from "./Spinner";

export default function Button({
	onClickFunc,
	loadingState,
	text,
}: {
	onClickFunc: any;
	loadingState: boolean | null;
	text: string;
}) {
	return (
		<button
			className="btn flex justify-center items-center md:w-[335px] w-[305px] h-[59px] mt-[38px] bg-blue-501 text-[22px] text-white"
			onClick={onClickFunc}
		>
			{loadingState ? <Spinner></Spinner> : text}
		</button>
	);
}
