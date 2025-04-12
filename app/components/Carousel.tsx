import carouselIcon1 from "../media/carousel-icon-1.png";
import carouselIcon2 from "../media/carousel-icon-2.png";
import CarouselLeftArrow from "./CarouselLeftArrow";
import CarouselRightArrow from "./CarouselRightArrow";
import { useState, type UIEventHandler } from "react";
import { useRef } from "react";

export default function CustomCarousel() {
	const cardProperties =
		"w-[400px] min-w-[400px] h-[225px] p-[20px] pt-[30px] rounded-[10px] shadowed mr-[30px]";
	const carouselRef: React.RefObject<null | HTMLDivElement> = useRef(null);

	const [scrollLeft, setScrollLeft] = useState<undefined | number>();
	const [scrollLeftMax, setScrollLeftMax] = useState<undefined | number>();

	const handleScroll = () => {
		if (carouselRef.current) {
			setScrollLeft(carouselRef.current.scrollLeft);
			setScrollLeftMax(carouselRef.current.scrollLeftMax);
			console.log(scrollLeft, scrollLeftMax);
		}
	};
	const arrowHandle = (
		step: number,
		element: React.RefObject<null | HTMLDivElement>
	) => {
		let scrollCurrent = 0;

		const scrollTimer = setInterval(() => {
			element.current ? (element.current.scrollLeft += step) : null;
			scrollCurrent += Math.abs(step);
			if (scrollCurrent >= step) {
				clearInterval(scrollTimer);
			}
		}, 25);
	};
	let [leftArrowDisabled, rightArrowDisabled] = [true, false];
	if (
		typeof scrollLeft !== "undefined" &&
		typeof scrollLeftMax !== "undefined"
	) {
		if (scrollLeft === scrollLeftMax) {
			rightArrowDisabled = true;
		} else {
			rightArrowDisabled = false;
		}
		if (scrollLeft <= 0) {
			leftArrowDisabled = true;
		} else {
			leftArrowDisabled = false;
		}
	}

	return (
		<div className="flex flex-row items-center">
			<CarouselLeftArrow
				func={arrowHandle}
				step={-430}
				element={carouselRef}
				disable={leftArrowDisabled}
			></CarouselLeftArrow>
			<div
				className="overflow-x-scroll scroll-smooth relative left-[-20px]"
				ref={carouselRef}
				onScroll={handleScroll}
			>
				<div className="flex flex-row mb-[20px] mt-[20px]">
					<div className={cardProperties + " ml-[20px]"}>
						<img
							src={carouselIcon1}
							alt="carousel-icon-1"
							className="w-[64px] h-[64px]"
						/>
						<div className="mt-[19px] text-lg">
							Высокая и оперативная скорость <br />
							обработки заявки
						</div>
					</div>
					<div className={cardProperties}>
						<img
							src={carouselIcon2}
							alt="carousel-icon-1"
							className="w-[64px] h-[64px]"
						/>
						<div className="mt-[19px] text-lg">
							Высокая и оперативная скорость <br />
							обработки заявки
						</div>
					</div>
					<div className={cardProperties}>
						<img
							src={"carouselIcon1"}
							alt="carousel-icon-1"
							className="w-[64px] h-[64px]"
						/>
						<div className="mt-[19px] text-lg">
							Высокая и оперативная скорость <br />
							обработки заявки
						</div>
					</div>
					<div className={cardProperties}>
						<img
							src={"carouselIcon1"}
							alt="carousel-icon-1"
							className="w-[64px] h-[64px]"
						/>
						<div className="mt-[19px] text-lg">
							Высокая и оперативная скорость <br />
							обработки заявки
						</div>
					</div>
					<div className={cardProperties}>
						<img
							src={"carouselIcon1"}
							alt="carousel-icon-1"
							className="w-[64px] h-[64px]"
						/>
						<div className="mt-[19px] text-lg">
							Высокая и оперативная скорость <br />
							обработки заявки
						</div>
					</div>
					<div className="min-w-[1px]"></div>
				</div>
			</div>
			<CarouselRightArrow
				func={arrowHandle}
				step={430}
				element={carouselRef}
				disable={rightArrowDisabled}
			/>
		</div>
	);
}
