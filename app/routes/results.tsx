import CarouselResults from "~/components/carousel/CarouselResults";
import img1 from "../media/results-img-1.svg";
import DocumentCard from "~/components/Document";
import { useState } from "react";
import { useGlobalContext } from "~/components/ContextProvider";
import getSearchObjects from "~/requests/searchObjects";
import getDocuments from "~/requests/documents";
import type { HistogramsRequestParams } from "~/entities/entities";

export default function Results() {
  const [showCount, setShowCount] = useState(2);
  const [docsData, setDocsData] = useState<null | any>(null);
  const context = useGlobalContext();
  let totalDocumets = [] as Array<{ date: string; value: number }>;
  let riskFactors = [] as Array<{ date: string; value: number }>;

  if (context?.histogramData) {
    console.log("hist", context?.histogramData);
    totalDocumets = context?.histogramData[0].data;
    riskFactors = context.histogramData[1].data;
  }
  //   let docArray = []
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
      const responseDocs = await getDocuments({ ids: formatData });
      if (responseDocs.status === 200) {
        setDocsData(responseDocs.data);
      }
    }
  }

  getData();

  let histArray: Array<{ date: string; total: number; risks: number }> = [];
  totalDocumets.forEach((e) => {
    const risk = riskFactors.filter((el) => el.date === e.date);
    const riskValue = risk[0].value;
    histArray.push({ date: e.date, risks: riskValue, total: e.value });
  });

  const countVar = "4221";
  const docCount = 10;
  function handleShow() {
    setShowCount(showCount + 2);
  }
  const doc = (
    date: string,
    title: string,
    tags: Array<any>,
    img: string,
    text: string,
    source: { name: string; url: string }
  ) => {
    return (
      <DocumentCard
        date={date}
        title={title}
        tags={tags}
        img={""}
        text={text}
        source={{ name: source.name, url: source.url }}
      ></DocumentCard>
    );
  };

  //   let docArray = [];
  //   for (let i = 0; i < docCount; i++) {
  //     docArray.push(doc);
  //   }
  console.log("docsData", docsData);
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
          Найдено {countVar} вариантов
        </div>
      </div>
      <CarouselResults data={histArray}></CarouselResults>
      <div className="mt-[107px]">
        <div className="font-ferry text-[30px]">Список документов</div>
        <div className="grid grid-cols-2 mt-[58px] justify-between gap-y-[38px]">
          {docsData
            ? docsData.map((el: any) => {
                const formattedDate = new Date(
                  el.ok.content.markup.issueDate
                ).toLocaleDateString();
                const docEnt = {
                  date: formattedDate,
                  title: el.ok.title.text,
                  tags: [
                    el.ok.attributes.isTechNews ? "Технические новости" : "",
                  ],
                  text: el.ok.content.markup,
                  source: { name: el.ok.source.name, url: el.ok.url },
                  img: "",
                };
                return doc(
                  docEnt.date,
                  docEnt.title,
                  docEnt.tags,
                  docEnt.img,
                  docEnt.text,
                  docEnt.source
                );
              })
            : ""}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="btn w-[305px] h-[59px] mt-[38px] bg-blue-501 text-[22px] text-white"
          onClick={handleShow}
        >
          Показать больше
        </button>
      </div>
    </div>
  );
}
