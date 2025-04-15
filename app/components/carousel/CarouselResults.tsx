import CarouselRightArrow from "./CarouselRightArrow";
import CarouselLeftArrow from "./CarouselLeftArrow";
import { useEffect, useRef, useState } from "react";

export default function CarouselResults() {
	const [pos, setPos] = useState<number>(0);
	const [containerW, setContainerW] = useState<number | undefined>(0);
	const [innerWidth, setInnerWidth] = useState<number | undefined>(0);

	const innerRef = useRef<null | HTMLDivElement>(null);
	const containerRef = useRef<null | HTMLDivElement>(null);
	useEffect(() => {
		setContainerW(containerRef.current?.offsetWidth);
		setInnerWidth(innerRef.current?.offsetWidth);
	}, [innerRef]);
	const card = (
		<div className="flex flex-col justify-between items-center pt-[16px] pb-[16px] text-lg font-[400] w-[137px] border-r-2 border-inactive">
			<div>10.09.2024</div>
			<div>5</div>
			<div>0</div>
		</div>
	);
	let cards = [];
	for (let i = 0; i < 20; i++) {
		cards.push(card);
	}
	function arrowFunc(
		step: number,
		innerEl: React.RefObject<null | HTMLDivElement>,
		containerEl: React.RefObject<null | HTMLDivElement>
	) {
		const stepW = containerW;
		if (innerWidth && stepW && innerWidth + pos - stepW <= stepW && step < 0) {
			if (pos !== -innerWidth + stepW) {
				setPos(-innerWidth + stepW);
			}
		} else if (stepW && step < 0) {
			setPos(pos - stepW);
		}
		if (stepW && step > 0 && Math.abs(pos) <= stepW) {
			if (pos !== 0) {
				console.log("cond 2 - 1");
				setPos(0);
			}
		} else if (stepW && step > 0) {
			setPos(pos + stepW);
		}
	}
	return (
		<div className="flex flex-row items-center mt-[27px]">
			<CarouselLeftArrow
				func={arrowFunc}
				element={innerRef}
				step={1000}
				disable={false}
				secondEl={containerRef}
			></CarouselLeftArrow>
			<div className="flex border-2 border-viridian-500 rounded-[10px]">
				<div className="flex flex-col justify-between items-center pt-[16px] pb-[16px] bg-viridian-500 w-[133px] rounded-l-[10px] text-white font-[500] text-xl ">
					<div>Период</div>
					<div>Всего</div>
					<div>Риски</div>
				</div>
				<div
					className="overflow-clip max-w-[1197px]"
					ref={containerRef}
				>
					<div
						className="relative flex flex-row h-[158px] w-[3000px] transition-[left] duration-300"
						ref={innerRef}
						style={{ left: pos }}
					>
						{cards.map((e) => e)}
					</div>
				</div>
			</div>
			<CarouselRightArrow
				func={arrowFunc}
				element={innerRef}
				step={-1000}
				disable={false}
				secondEl={containerRef}
			></CarouselRightArrow>
		</div>
	);
}
