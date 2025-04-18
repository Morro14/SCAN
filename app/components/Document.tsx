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
  tags: Array<string>;
}) {
  return (
    <div className="shadowed w-[641px] h-[694px] rounded-[10px] p-[19px_30px_35px_30px]">
      <div className="flex flex-col h-[100%] justify-between">
        <div className="">
          <div className="flex flex-row text-base text-[#949494]">
            <div>{date}</div>
            <div className="ml-[18px]">{source.name}</div>
          </div>
          <div className="text-[26px] mt-[24px]"></div>
          <div className="h-[158px] rounded-[10px] bg-amber-100 mt-[17px]">
            {text}
          </div>
          <div className="mt-[20px] opacity-50 overflow-clip">{title}</div>
        </div>
        <div className="flex flex-row mt-[32px] justify-between items-end">
          <button className="btn w-[223px] h-[47px] rounded-[5px] bg-[#7CE3E1]">
            Читать в источнике
          </button>
          <div className="text-inactive rounded-[5px]">3 233 слова</div>
        </div>
      </div>
    </div>
  );
}
