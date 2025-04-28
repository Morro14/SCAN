import CarouselResults from "~/components/carousel/CarouselResults";
import img1 from "../media/results-img-1.svg";
import DocumentCard from "~/components/Document";
import { useEffect, useState } from "react";
import getSearchObjects from "~/requests/searchObjects";
import getDocuments from "~/requests/documents";
import type {
	HistogramsRequestParams,
	HistogramData,
} from "~/entities/entities";
import formatDate from "~/utils/formatDate";
import { isRouteErrorResponse, useRouteError } from "react-router";
import CarouselResultsPlaceholder from "~/components/carousel/CarouselResultsPlaceholder";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import {
	selectHistograms,
	selectSearchParams,
	setSearchRes,
} from "~/redux/searchResultsSlice";
import Button from "~/components/util/Buttons";

export function ErrorBoundary() {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		console.log("is route error", error);
		return (
			<div>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</div>
		);
	} else if (error instanceof Error) {
		console.log("normal error", error);
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>
				{/* <p>The stack trace is:</p>
        <pre>{error.stack}</pre> */}
			</div>
		);
	} else {
		return <h1>Unknown Error</h1>;
	}
}
export default function Results() {
	const [showCount, setShowCount] = useState(2);
	const [docsData, setDocsData] = useState<null | any>(null);
	const [docIDs, setDocIDs] = useState<null | any>(null);
	const [loadDocs, setLoadDocs] = useState<boolean>(false);

	const histSlice = useAppSelector(selectHistograms);
	const searchSlice = useAppSelector(selectSearchParams);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (
			histSlice === null &&
			searchSlice === null &&
			sessionStorage.getItem("histograms") &&
			sessionStorage.getItem("searchRequestData")
		) {
			dispatch(
				setSearchRes({
					histograms: JSON.parse(
						sessionStorage.getItem("histograms") as string
					) as HistogramData,
					searchParams: JSON.parse(
						sessionStorage.getItem("searchRequestData") as string
					) as HistogramsRequestParams,
				})
			);
		} else if (histSlice && searchSlice && !docsData) {
			getData();
		}
	}, [docsData, getData]);

	let totalDocumets = [] as Array<{ date: string; value: number }> | null;
	let riskFactors = [] as Array<{ date: string; value: number }> | null;
	let histCount = 0;
	if (histSlice) {
		histCount = histSlice[0].data.length;
		totalDocumets = histSlice
			? (histSlice[0].data as Array<{
					date: string;
					value: number;
			  }>)
			: null;
		riskFactors = histSlice
			? (histSlice[1].data as Array<{
					date: string;
					value: number;
			  }>)
			: null;
	}

	async function getData() {
		let responseObj: any = "";
		responseObj = await getSearchObjects(
			searchSlice as HistogramsRequestParams
		);

		if (responseObj.status === 200) {
			const formatData = responseObj.data.items.map((el: any) => {
				return el.encodedId;
			});

			const responseDocs = await getDocuments({
				ids: formatData.length >= 2 ? formatData.slice(0, 2) : formatData,
			});
			if (responseDocs.status === 200) {
				setDocsData(responseDocs.data);
				setDocIDs(formatData);
			}
		}
	}

	async function handleShowMore() {
		setLoadDocs(true);
		let plusCount = 0;
		if (docIDs.length >= showCount + 2) {
			plusCount = 2;
		} else {
			plusCount = docIDs.length - showCount;
		}
		let newDocs = [];
		if (plusCount !== 0) {
			newDocs = await getDocuments({
				ids: docIDs.slice(showCount, showCount + plusCount),
			});
		} else {
			return;
		}

		setShowCount(showCount + plusCount);
		setDocsData(docsData.concat(newDocs.data));
		setLoadDocs(false);
	}
	let histArray: Array<{ date: string; total: number; risks: number }> = [];
	totalDocumets?.forEach((e) => {
		const risk = riskFactors?.filter((el) => el.date === e.date) as Array<{
			date: string;
			value: number;
		}>;
		const riskValue = risk[0].value;
		histArray.push({ date: e.date, risks: riskValue, total: e.value });
	});

	let docCount = 0;
	const doc = (
		date: string,
		title: string,
		tags: Array<any>,
		img: string,
		text: string,
		source: { name: string; url: string },
		wordCount: number,
		docCount: number
	) => {
		return (
			<DocumentCard
				date={date}
				title={title}
				tags={tags}
				img={""}
				text={text}
				source={{ name: source.name, url: source.url }}
				wordCount={wordCount}
				docCount={docCount}
			></DocumentCard>
		);
	};
	return (
		<div>
			<div className="md:flex justify-between max-h-[376px]">
				<div>
					<div className="md:black font-ferry text-[28px] md:text-[40px] md:leading-[46px] leading-tight mt-[69px]">
						Ищем. Скоро <br />
						будут результаты
					</div>
					<div className="md:text-xl text-lg leading-tight mt-[25px]">
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
				<div className="font-ferry text-[30px] mt-[59px] md:mt-0">
					Общая сводка
				</div>
				<div className="text-lg text-inactive font-[400px] md:mt-[17px] mt-[10px]">
					Найдено {histCount} вариантов
				</div>
			</div>
			{histSlice ? (
				<CarouselResults data={histArray}></CarouselResults>
			) : (
				<CarouselResultsPlaceholder></CarouselResultsPlaceholder>
			)}

			<div className="md:mt-[107px] mt-[57px]">
				<div className="font-ferry md:text-[30px] text-[28px]">
					Список документов
				</div>
				<div className="md:grid md:grid-cols-2 mt-[58px] md:justify-between md:gap-y-[38px]">
					{docsData
						? docsData.slice(0, showCount).map((el: any) => {
								docCount += 1;
								const dateF = new Date(el.ok.issueDate);
								const formattedDate = formatDate(dateF);
								const tags1 = Object.keys(el.ok.attributes).filter(
									(a) =>
										a === "isAnnouncement" ||
										a === "isTechNews" ||
										a === "isDigest"
								);
								const tags = tags1.map((a: any) => {
									if (a === "isAnnouncement" && el.ok.attributes[a]) {
										return "Анонсы и события";
									}
									if (a === "isTechNews " && el.ok.attributes[a]) {
										return "Технические новости";
									}
									if (a === "isDigest  " && el.ok.attributes[a]) {
										return "Сводки новостей";
									}
								});
								const docEnt = {
									date: formattedDate,
									title: el.ok.title.text,
									tags: tags,
									text: el.ok.content.markup,
									source: { name: el.ok.source.name, url: el.ok.url },
									img: "",
									wordCount: el.ok.attributes.wordCount,
								};
								return doc(
									docEnt.date,
									docEnt.title,
									docEnt.tags,
									docEnt.img,
									docEnt.text,
									docEnt.source,
									docEnt.wordCount,
									docCount
								);
						  })
						: ""}
				</div>
			</div>
			<div className="flex justify-center md:mt-0 mt-[-20px]">
				{docIDs && docIDs.length > showCount ? (
					<Button
						onClickFunc={handleShowMore}
						loadingState={loadDocs}
						text="Показать больше"
					></Button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
