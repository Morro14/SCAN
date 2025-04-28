import CarouselRightArrow from "./CarouselRightArrow";
import CarouselLeftArrow from "./CarouselLeftArrow";
import { useEffect, useRef, useState, type RefObject } from "react";
import formatDate from "~/utils/formatDate";
import Spinner from "../util/Spinner";

export default function CarouselResults({
	data,
}: {
	data: Array<{ date: string; total: number; risks: number }>;
}) {
	const [pos, setPos] = useState<number>(0);
	const [refs, setRefs] = useState<any>({});
	const [arrowActive, setArrowActive] = useState({ left: false, right: true });
	const innerRef = useRef<null | HTMLDivElement>(null);
	const containerRef = useRef<null | HTMLDivElement>(null);
	useEffect(() => {
		setRefs({ ...{ innerRef: innerRef, containerRef: containerRef } });
	}, [innerRef, containerRef, setRefs]);
	let cardCount = 0;
	const card = (cardData: { date: string; total: number; risks: number }) => {
		const dateF = new Date(cardData.date);
		const dateString = formatDate(dateF);
		return (
			<div
				className="flex md:flex-col flex-row h-[100%] justify-between items-center md:items-start md:pt-[16px] md:pb-[16px] text-lg font-[400] md:w-[135px] w-[298px]"
				key={"hist-card-" + cardCount}
			>
				<div className="w-[112px] md:flex md:justify-center md:w-full">
					<div className="md:m-0 ml-[10px]">{dateString}</div>
				</div>
				<div className="w-[30px] md:flex md:justify-center md:w-full">
					<div className="md:m-0 ml-[0px]">{cardData.total}</div>
				</div>
				<div className="w-[50px] md:flex md:justify-center md:w-full">
					<div className="md:m-0 ml-[0px]">{cardData.risks}</div>
				</div>
			</div>
		);
	};

	function arrowFunc(
		step: number,
		innerEl: React.RefObject<null | HTMLDivElement>,
		containerEl: React.RefObject<null | HTMLDivElement>
	) {
		const containerW = refs.containerRef.current.offsetWidth;
		const innerWidth = refs.innerRef.current.offsetWidth;
		const stepW = containerW;
		if (innerWidth && stepW && innerWidth + pos - stepW <= stepW && step < 0) {
			if (pos !== -innerWidth + stepW) {
				setPos(-innerWidth + stepW);
				setArrowActive({ ...arrowActive, right: false });
			}
		} else if (stepW && step < 0) {
			setPos(pos - stepW);
			setArrowActive({ left: true, right: true });
		}
		if (stepW && step > 0 && Math.abs(pos) <= stepW) {
			if (pos !== 0) {
				setPos(0);
				setArrowActive({ ...arrowActive, left: false });
			}
		} else if (stepW && step > 0) {
			setPos(pos + stepW);
			setArrowActive({ left: true, right: true });
		}
	}
	let elCount = 0;
	return (
		<div className="flex flex-row items-center justify-center mt-[27px]">
			<CarouselLeftArrow
				func={arrowFunc}
				element={innerRef}
				step={1000}
				active={arrowActive.left}
				secondEl={containerRef}
			></CarouselLeftArrow>
			<div className="flex md:flex-row flex-col grow md:border-2 md:border-viridian-500 rounded-[10px] shadow-[0_0_18px_0] shadow-[#00000033] md:shadow-[0_0_0_0] ">
				<div className="flex md:flex-col md:justify-between items-center pt-[16px] pb-[16px] bg-viridian-500  md:w-[133px]  md:h-[158px] h-[75px] md:rounded-l-[10px] md:rounded-tr-[0px] rounded-t-[10px] text-white font-[500] md:text-xl text-lg ">
					<div className="md:ml-0 ml-[15px]">Период</div>
					<div className="md:ml-0 ml-[62px]">Всего</div>
					<div className="md:ml-0 ml-[32px]">Риски</div>
				</div>
				<div
					className=" flex overflow-clip md:max-w-[1120px] max-w-[298px]"
					ref={containerRef}
				>
					{data.length === 0 ? (
						<div className="flex justify-center items-center w-full h-[65px]">
							<Spinner></Spinner>
						</div>
					) : (
						<div
							className="relative flex flex-row md:h-[158px] h-[65px] transition-[left] duration-300"
							ref={innerRef}
							style={{ left: pos }}
						>
							{data.map((el) => {
								elCount += 1;
								return (
									<div
										className="flex flex-row items-center"
										key={"hist-card-container-" + elCount}
									>
										{card({ date: el.date, total: el.total, risks: el.risks })}
										{elCount < 9 || elCount !== data.length ? (
											<div
												className="md:w-[2px] w-0 h-[124px] bg-inactive/40"
												key={"hist-card-line-" + elCount}
											></div>
										) : (
											""
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
			<CarouselRightArrow
				func={arrowFunc}
				element={innerRef}
				step={-1000}
				active={arrowActive.right}
				secondEl={containerRef}
			></CarouselRightArrow>
		</div>
	);
}
