import Spinner from "../util/Spinner";

export default function CarouselResultsPlaceholder() {
  return (
    <div className="flex flex-row items-center p-[0_31px_0_31px] w-[100%] mt-[27px] h-[162px]">
      <div className="flex border-2 border-viridian-500 rounded-[10px] w-[100%] h-[100%]">
        <div className="relative flex flex-col justify-between items-center pt-[16px] pb-[16px] bg-viridian-500 w-[133px] rounded-l-[10px] text-white font-[500] text-xl ">
          <div>Период</div>
          <div>Всего</div>
          <div>Риски</div>
        </div>
        <div className="flex flex-col justify-center grow items-center max-w-[1120px] ">
          <Spinner></Spinner>
          <div>Загружаем данные</div>
        </div>
      </div>
    </div>
  );
}
