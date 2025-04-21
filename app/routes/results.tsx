import CarouselResults from "~/components/carousel/CarouselResults";
import img1 from "../media/results-img-1.svg";
import DocumentCard from "~/components/Document";
import { useEffect, useState } from "react";
import { useGlobalContext } from "~/components/ContextProvider";
import getSearchObjects from "~/requests/searchObjects";
import getDocuments from "~/requests/documents";
import type {
  HistogramsRequestParams,
  HistogramData,
} from "~/entities/entities";
import formatDate from "~/utils/formatDate";
import { isRouteErrorResponse, useRouteError } from "react-router";
import Spinner from "~/components/util/Spinner";
import CarouselResultsPlaceholder from "~/components/carousel/CarouselResultsPlaceholder";

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
  // const [searchRequestData, setSearchRequestData] =
  //   useState<HistogramsRequestParams | null>(null);
  const [docIDs, setDocIDs] = useState<null | any>(null);
  const [loadDocs, setLoadDocs] = useState<boolean>(false);
  const context = useGlobalContext();

  useEffect(() => {
    if (sessionStorage.getItem("histograms") && !context?.histogramData) {
      context?.setHistogramData(
        JSON.parse(
          sessionStorage.getItem("histograms") as string
        ) as HistogramData
      );
    }
    if (
      sessionStorage.getItem("searchRequestData") &&
      !context?.searchRequestData
    ) {
      context?.setSearchRequestData(
        JSON.parse(sessionStorage.getItem("searchRequestData") as string)
      );
    }
  }),
    [
      context?.histogramData,
      context?.searchRequestData,
      context?.setSearchRequestData,
      context?.setHistogramData,
    ];

  let totalDocumets = [] as Array<{ date: string; value: number }> | null;
  let riskFactors = [] as Array<{ date: string; value: number }> | null;
  let histCount = 0;
  if (context?.histogramData) {
    histCount = context?.histogramData[0].data.length;
    totalDocumets = context?.histogramData
      ? (context?.histogramData[0].data as Array<{
          date: string;
          value: number;
        }>)
      : null;
    riskFactors = context?.histogramData
      ? (context?.histogramData[1].data as Array<{
          date: string;
          value: number;
        }>)
      : null;
  }

  async function getData() {
    let responseObj: any = "";
    if (context?.searchRequestData && !docsData) {
      responseObj = await getSearchObjects(
        context?.searchRequestData as HistogramsRequestParams
      );
    }

    if (responseObj.status === 200) {
      const formatData = responseObj.data.items.map((el: any) => {
        return el.encodedId;
      });

      const responseDocs = await getDocuments({ ids: formatData.slice(0, 2) });
      if (responseDocs.status === 200) {
        setDocsData(responseDocs.data);
        setDocIDs(formatData);
      }
    }
  }
  if (!docsData) {
    getData();
  }
  async function handleShowMore() {
    setLoadDocs(true);
    const newDocs = await getDocuments({
      ids: docIDs.slice(showCount, showCount + 2),
    });
    setShowCount(showCount + 2);
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

  // function handleShow() {
  //   setShowCount(showCount + 2);
  // }
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
          <img src={img1} alt="results-img-1" className="mr-[43px] mt-[25px]" />
        </div>
      </div>
      <div className="">
        <div className="font-ferry text-[30px]">Общая сводка</div>
        <div className="text-lg text-inactive font-[400px] mt-[17px]">
          Найдено {histCount} вариантов
        </div>
      </div>
      {context?.histogramData ? (
        <CarouselResults data={histArray}></CarouselResults>
      ) : (
        <CarouselResultsPlaceholder></CarouselResultsPlaceholder>
      )}

      <div className="mt-[107px]">
        <div className="font-ferry text-[30px]">Список документов</div>
        <div className="grid grid-cols-2 mt-[58px] justify-between gap-y-[38px]">
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
                    console.log("cond");
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
      <div className="flex justify-center">
        <button
          className="btn flex justify-center items-center w-[305px] h-[59px] mt-[38px] bg-blue-501 text-[22px] text-white"
          onClick={handleShowMore}
        >
          {loadDocs ? <Spinner></Spinner> : "Показать больше"}
        </button>
      </div>
    </div>
  );
}
