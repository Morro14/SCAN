import { redirect } from "react-router";

export default function DocumentCard({
  date,
  source,
  title,
  text,
  img,
  tags,
  wordCount,
  docCount,
}: {
  date: string;
  source: { name: string; url: string };
  title: string;
  img: string;
  text: string;
  tags: Array<string>;
  wordCount: number;
  docCount: number;
}) {
  let tagCount = 0;
  return (
    <div
      className="shadowed w-[641px] h-[694px] rounded-[10px] p-[19px_30px_35px_30px]"
      key={"doc-" + docCount}
    >
      <div
        className="flex flex-col h-[100%] justify-between"
        key={"doc-2-" + docCount}
      >
        <div className="" key={"doc-3-" + docCount}>
          <div
            className="flex flex-row text-base text-[#949494]"
            key={"doc-4-" + docCount}
          >
            <div key={"doc-5-" + docCount}>{date}</div>
            <a
              className="ml-[18px] truncate"
              href={source.url}
              key={"doc-6-" + docCount}
            >
              {source.name}
            </a>
          </div>
          <div
            className="block text-[26px] mt-[24px] h-[62px] max-h-[2.4em] leading-[1.2] overflow-hidden"
            key={"doc-7-" + docCount}
          >
            {title}
          </div>
          <div className="flex flex-row" key={"doc-8-" + docCount}>
            {tags.map((e) => {
              tagCount += 1;
              return e !== "" ? (
                <div
                  key={"doc-9-" + tagCount + "-" + docCount}
                  className="flex justify-center items-center max-w-[157px] h-[22px] mt-[17px] mr-[5px] bg-[#FFB64F] rounded-[5px] text-xs"
                >
                  {e}
                </div>
              ) : (
                ""
              );
            })}
          </div>
          <div
            className="h-[158px] rounded-[10px] bg-gray-400 mt-[17px]"
            key={"doc-10-" + docCount}
          ></div>
          <div
            className="mt-[20px] max-h-[221px] opacity-50 overflow-clip"
            key={"doc-11-" + docCount}
          >
            {text}
          </div>
        </div>
        <div
          className="flex flex-row mt-[32px] justify-between items-end"
          key={"doc-12-" + docCount}
        >
          <button
            className="btn w-[223px] h-[47px] rounded-[5px] bg-[#7CE3E1]"
            onClick={() => window.open(source.url)}
            key={"doc-13-" + docCount}
          >
            Читать в источнике
          </button>
          <div
            className="text-inactive rounded-[5px]"
            key={"doc-14-" + docCount}
          >
            {wordCount} слова
          </div>
        </div>
      </div>
    </div>
  );
}
