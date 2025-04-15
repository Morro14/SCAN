export default function DocumentCard({
	date,
	source,
	title,
	text,
	img,
	tags,
}: {
	date: string;
	source: { name: string; url: string };
	title: string;
	img: string;
	text: string;
	tags: [string];
}) {
	return (
		<div className="shadowed w-[641px] h-[694px] rounded-[10px] p-[19px_30px_0_30px]">
			<div className="flex flex-row text-base text-[#949494]">
				<div>{date}</div>
				<div className="ml-[18px]">{source.name}</div>
			</div>
			<div className="text-[26px] mt-[24px]">{title}</div>
			<div className="h-[158px] rounded-[10px] bg-amber-100 mt-[17px]"></div>
			<div className="mt-[20px] opacity-50">
				Кто такой Data Scientist и чем он занимается? Data Scientist — это
				специалист, который работает с большими массивами данных, чтобы с их
				помощью решить задачи бизнеса. Простой пример использования больших
				данных и искусственного интеллекта — умные ленты в социальных сетях. На
				основе ваших просмотров и лайков алгоритм выдает рекомендации с
				контентом, который может быть вам интересен. Эту модель создал и обучил
				дата-сайентист, и скорее всего, не один. В небольших компаниях и
				стартапах дата-сайентист делает все: собирает и очищает данные, создает
				математическую модель для их анализа, тестирует ее и презентует готовое
				решение бизнесу.
			</div>
			<div className="flex flex-row mt-[32px]">
				<button className="w-[223px] h-[47px] rouned-[5px] bg-[#7CE3E1]">
					Читать в источнике
				</button>
				<div className="text-inactive rounded-[5px]">3 233 слова</div>
			</div>
		</div>
	);
}
