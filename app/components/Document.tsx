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
	function parseText(text: string) {
		const reg = new RegExp("<[\\s\\S]+?>", "g");
		const text_ = text.replace(reg, "");

		return text_;
	}
	let tagCount = 0;
	return (
		<div
			className="shadowed md:w-[641px] h-[694px] rounded-[10px] md:p-[19px_30px_35px_30px] p-[19px_21px_18px_24px] md:mb-0 mb-[20px]"
			key={"doc-" + docCount}
		>
			<div
				className="flex flex-col h-[100%] justify-between"
				key={"doc-2-" + docCount}
			>
				<div
					className=""
					key={"doc-3-" + docCount}
				>
					<div
						className="flex flex-row md:text-base text-sm text-[#949494]"
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
						className="block md:text-[26px] text-[19px] md:mt-[24px] mt-[21px] h-[62px] max-h-[2.4em] leading-[1.2] overflow-hidden"
						key={"doc-7-" + docCount}
					>
						{title}
					</div>
					<div
						className="flex flex-row"
						key={"doc-8-" + docCount}
					>
						{tags.map((e) => {
							tagCount += 1;
							return e !== undefined ? (
								<div
									key={"doc-9-" + tagCount + "-" + docCount}
									className="flex justify-center items-center md:max-w-[157px] max-w-[132px] md:h-[22px] h-[20px] mt-[17px] mr-[5px] bg-[#FFB64F] rounded-[5px] md:text-xs text-[10px]"
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
						className="mt-[20px] md:max-h-[221px] max-h-[255px] opacity-50 overflow-clip md:text-base text-sm"
						key={"doc-11-" + docCount}
					>
						{parseText(text)}
					</div>
				</div>
				<div
					className="flex flex-row mt-[32px] justify-between items-end"
					key={"doc-12-" + docCount}
				>
					<button
						className="btn md:w-[223px] w-[195px] md:h-[47px] h-[41px] md:text-base text-sm rounded-[5px] bg-[#7CE3E1]"
						onClick={() => window.open(source.url)}
						key={"doc-13-" + docCount}
					>
						Читать в источнике
					</button>
					<div
						className="text-inactive md:text-base text-sm rounded-[5px]"
						key={"doc-14-" + docCount}
					>
						{wordCount > 999
							? String(wordCount).slice(0, 1) +
							  " " +
							  String(wordCount).slice(1, String(wordCount).length) +
							  " "
							: wordCount + " "}
						слова
					</div>
				</div>
			</div>
		</div>
	);
}
