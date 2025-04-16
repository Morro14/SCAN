import CarouselResults from "~/components/carousel/CarouselResults";
import img1 from "../media/results-img-1.svg";
import DocumentCard from "~/components/Document";
import { useState } from "react";
export default function Results() {
	const [showCount, setShowCount]= useState(2)
	const countVar = "4221";
	const docCount = 10
	function handleShow() {
		setShowCount(showCount + 2)
	}
	const doc = <DocumentCard
	date="15.10.2021"
	title="Работа в Data Science в 2022 году: тренды, навыки и обзор специализаций"
	tags={["Технические новости"]}
	img={""}
	text="Кто такой Data Scientist и чем он занимается?
Data Scientist — это специалист, который работает с большими массивами данных, чтобы с их помощью решить задачи бизнеса. Простой пример использования больших данных и искусственного интеллекта — умные ленты в социальных сетях. На основе ваших просмотров и лайков алгоритм выдает рекомендации с контентом, который может быть вам интересен. Эту модель создал и обучил дата-сайентист, и скорее всего, не один.

В небольших компаниях и стартапах дата-сайентист делает все: собирает и очищает данные, создает математическую модель для их анализа, тестирует ее и презентует готовое решение бизнесу"
	source={{ name: "VC.RU", url: "url" }}
></DocumentCard>
	let docArray = []
	for (let i =0; i<docCount; i++) {
		docArray.push(doc)
	}
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
			<div className="mt-[107px]">
				<div className="font-ferry text-[30px]">Список документов</div>
				<div className="grid grid-cols-2 mt-[58px] justify-between gap-y-[38px]">
					{docArray.slice(0, showCount).map(()=>{
						return doc
					})}
				</div>
			</div>
			<div className="flex justify-center">
			<button className="btn w-[305px] h-[59px] mt-[38px] bg-blue-501 text-[22px] text-white" onClick={handleShow}>Показать больше</button>
			</div>
		</div>
	);
}
