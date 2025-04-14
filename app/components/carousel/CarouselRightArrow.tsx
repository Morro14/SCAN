import img from "../../media/carousel-arrow-right.svg";

export default function CarouselRightArrow({
	func,
	step,
	element,
	disable,
	secondEl = null,
}: {
	func: (
		step: number,
		element: React.RefObject<null | HTMLDivElement>,
		secondEl?: any
	) => void;
	step: number;
	element: React.RefObject<null | HTMLDivElement>;
	disable: boolean;
	secondEl?: React.RefObject<null | HTMLDivElement> | null;
}) {
	return (
		<div
			className={`min-w-[39px] min-h-[39px] mr-[4px] cursor-pointer`}
			onClick={!disable ? (e) => func(step, element, secondEl) : undefined}
		>
			<img
				src={img}
				className={`w-[39px] min-w-[39px] h-[39px] ${
					disable ? "hidden" : "inline"
				}`}
			></img>
		</div>
	);
}
