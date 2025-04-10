import img from "../media/carousel-arrow-left.svg";

export default function CarouselLeftArrow({
	func,
	step,
	element,
	disable,
}: {
	func: (step: number, element: React.RefObject<null | HTMLDivElement>) => void;
	step: number;
	element: React.RefObject<null | HTMLDivElement>;
	disable: boolean;
}) {
	return (
		<div
			className="min-w-[39px] min-h-[39px] mr-[4px] cursor-pointer"
			onClick={!disable ? (e) => func(step, element) : undefined}
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
