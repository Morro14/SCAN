import Spinner from "./util/Spinner";

export default function HeaderInfo({
	data,
	opacity,
}: {
	data: any;
	opacity: number;
}) {
	return data === null ? (
		<div
			style={{ opacity: opacity }}
			className="flex justify-center items-center flex-col transition-all md:w-[175px] w-[111px] md:h-[63px] h-[75px] bg-[#D9D9D9]/40 rounded-[5px] p-[8px]"
		>
			<Spinner></Spinner>
		</div>
	) : (
		<div
			className="flex justify-center flex-col transition-all md:w-[175px] w-[111px] md:h-[63px] h-[75px] bg-[#D9D9D9]/40 rounded-[5px] p-[8px]"
			style={{ opacity: opacity }}
		>
			<div className="md:flex md:flex-row md:items-center md:justify-end block">
				<div className="md:text-[10px] text-[8px] text-gray-950/40 text-nowrap md:text-wrap">
					Использовано компаний
				</div>
				<div className="text-[14px] font-bold md:ml-[9px]">
					{data ? data?.count : "loading"}
				</div>
			</div>
			<div className="md:flex md:flex-row md:items-center md:justify-end block">
				<div className="md:text-[10px] text-[8px] text-gray-950/40 text-nowrap md:text-wrap ">
					Лимит по компаниям
				</div>
				<div className="text-[14px] text-[#8AC540] font-bold md:ml-[9px]">
					{data ? data?.limit : "loading"}
				</div>
			</div>
		</div>
	);
}
