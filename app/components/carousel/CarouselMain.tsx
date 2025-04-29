import CarouselRightArrow from "./CarouselRightArrow";
import CarouselLeftArrow from "./CarouselLeftArrow";
import carouselIcon1 from "../../media/carousel-icon-1.png";
import carouselIcon2 from "../../media/carousel-icon-2.png";
import { useEffect, useRef, useState } from "react";

export default function CarouselMain() {
	const [pos, setPos] = useState<number>(0);
	const [refs, setRefs] = useState<any>({});
	const [arrowActive, setArrowActive] = useState({ left: false, right: true });

	const innerRef = useRef<null | HTMLDivElement>(null);
	const containerRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		setRefs({ ...{ innerRef: innerRef, containerRef: containerRef } });
	}, [innerRef, containerRef, setRefs]);

	function arrowFunc(step: number) {
		const containerW = refs.containerRef.current.offsetWidth;
		const innerWidth = refs.innerRef.current.offsetWidth;
		const stepW = containerW;

		if (innerWidth && stepW && innerWidth + pos - stepW <= stepW && step < 0) {
			if (pos !== -innerWidth + stepW) {
				setPos(-innerWidth + stepW);
				setArrowActive({ left: true, right: false });
			}
		} else if (stepW && step < 0) {
			setPos(pos - stepW);
			setArrowActive({ left: true, right: true });
		}
		if (stepW && step > 0 && Math.abs(pos) <= stepW) {
			if (pos !== 0) {
				setPos(0);
				setArrowActive({ left: false, right: true });
			}
		} else if (stepW && step > 0) {
			setPos(pos + stepW);
			setArrowActive({ left: true, right: true });
		}
	}

	const cardProperties =
		"md:w-[400px] w-[298px] md:min-w-[400px] min-w-[298px] md:h-[225px] h-[188px] p-[17px] pt-[30px] rounded-[10px] shadowed";

	return (
		<div className="flex flex-row items-center justify-center mt-[27px]">
			<div className="md:static relative left-[19px]">
				<CarouselLeftArrow
					func={arrowFunc}
					element={innerRef}
					step={1000}
					active={arrowActive.left}
					secondEl={containerRef}
				></CarouselLeftArrow>
			</div>

			<div
				className=" flex overflow-clip md:max-w-[1292px] max-w-[336px]"
				ref={containerRef}
			>
				<div
					className="relative flex flex-row  transition-[left] duration-300"
					ref={innerRef}
					style={{ left: pos }}
				>
					<div className="flex flex-row mb-[20px] mt-[20px] md:mt-[15px]">
						<div className={cardProperties + " ml-[19px] md:ml-[15px] "}>
							<img
								src={carouselIcon1}
								alt="carousel-icon-1"
								className="w-[64px] h-[64px]"
							/>
							<div className="mt-[19px] text-lg">
								Высокая и оперативная <br /> скорость обработки заявки
							</div>
						</div>
						<div className={cardProperties + " ml-[38px] md:ml-[30px]"}>
							<img
								src={carouselIcon2}
								alt="carousel-icon-1"
								className="w-[64px] h-[64px]"
							/>
							<div className="mt-[19px] text-lg">
								Высокая и оперативная <br /> скорость обработки заявки
							</div>
						</div>
						<div className={cardProperties + " ml-[38px] md:ml-[30px]"}>
							<img
								src={carouselIcon2}
								alt="carousel-icon-1"
								className="w-[64px] h-[64px]"
							/>
							<div className="mt-[19px] text-lg">
								Высокая и оперативная <br /> скорость обработки заявки
							</div>
						</div>
						<div className={cardProperties + " ml-[38px] md:ml-[30px]"}>
							<img
								src={carouselIcon2}
								alt="carousel-icon-1"
								className="w-[64px] h-[64px]"
							/>
							<div className="mt-[19px] text-lg">
								Высокая и оперативная <br /> скорость обработки заявки
							</div>
						</div>
						<div
							className={
								cardProperties +
								" ml-[38px] mr-[19px] md:ml-[30px] md:mr-[15px]"
							}
						>
							<img
								src={carouselIcon2}
								alt="carousel-icon-1"
								className="w-[64px] h-[64px]"
							/>
							<div className="mt-[19px] text-lg">
								Высокая и оперативная <br /> скорость обработки заявки
							</div>
						</div>
						<div className="min-w-[1px]"></div>
					</div>
				</div>
			</div>
			<div className="md:static relative right-[15px]">
				<CarouselRightArrow
					func={arrowFunc}
					element={innerRef}
					step={-1000}
					active={arrowActive.right}
					secondEl={containerRef}
				></CarouselRightArrow>
			</div>
		</div>
	);
}
