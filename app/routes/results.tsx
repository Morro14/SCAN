import CarouselResults from "~/components/carousel/CarouselResults";
import img1 from "../media/results-img-1.svg";

export default function Results() {
	const countVar = "4221";
	return (
		<div>
			<div className="flex justify-between max-h-[376px]">
				<div>
					<div className="black text-[40px] leading-[46px] mt-[69px]">
						Ищем. Скоро <br />
						будут результаты
					</div>
					<div className="text-xl mt-[25px]">
						Поиск может занять некоторое время, <br />
						просим сохранять терпение.
					</div>
				</div>
				<div className="">
					<img
						src={img1}
						alt="results-img-1"
						className="mr-[43px] mt-[25px]"
					/>
				</div>
			</div>
			<div className="">
				<div className="font-ferry text-[30px]">Общая сводка</div>
				<div className="text-lg text-inactive font-[400px] mt-[17px]">
					Найдено {countVar} вариантов
				</div>
			</div>
			<CarouselResults></CarouselResults>
		</div>
	);
}
