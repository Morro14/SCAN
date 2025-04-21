import CarouselRightArrow from "./CarouselRightArrow";
import CarouselLeftArrow from "./CarouselLeftArrow";
import { useEffect, useRef, useState, type RefObject } from "react";
import formatDate from "~/utils/formatDate";

export default function CarouselResults({
  data,
}: {
  data: Array<{ date: string; total: number; risks: number }>;
}) {
  const [pos, setPos] = useState<number>(0);
  const [refs, setRefs] = useState<any>({});

  const innerRef = useRef<null | HTMLDivElement>(null);
  const containerRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    setRefs({ ...{ innerRef: innerRef, containerRef: containerRef } });
  }, [innerRef, containerRef, setRefs]);
  let cardCount = 0;
  const card = (cardData: { date: string; total: number; risks: number }) => {
    const dateF = new Date(cardData.date);
    const dateString = formatDate(dateF);
    return (
      <div
        className="flex flex-col h-[100%] justify-between items-center pt-[16px] pb-[16px] text-lg font-[400] w-[135px]"
        key={"hist-card-" + cardCount}
      >
        <div>{dateString}</div>
        <div>{cardData.total}</div>
        <div>{cardData.risks}</div>
      </div>
    );
  };

  function arrowFunc(
    step: number,
    innerEl: React.RefObject<null | HTMLDivElement>,
    containerEl: React.RefObject<null | HTMLDivElement>
  ) {
    const containerW = refs.containerRef.current.offsetWidth;
    const innerWidth = refs.innerRef.current.offsetWidth;
    console.log("arrow func", pos, containerW, innerWidth);
    const stepW = containerW;
    if (innerWidth && stepW && innerWidth + pos - stepW <= stepW && step < 0) {
      if (pos !== -innerWidth + stepW) {
        setPos(-innerWidth + stepW);
      }
    } else if (stepW && step < 0) {
      setPos(pos - stepW);
    }
    if (stepW && step > 0 && Math.abs(pos) <= stepW) {
      if (pos !== 0) {
        console.log("cond 2 - 1");
        setPos(0);
      }
    } else if (stepW && step > 0) {
      setPos(pos + stepW);
    }
  }
  let elCount = 0;
  return (
    <div className="flex flex-row items-center justify-center mt-[27px]">
      <CarouselLeftArrow
        func={arrowFunc}
        element={innerRef}
        step={1000}
        disable={false}
        secondEl={containerRef}
      ></CarouselLeftArrow>
      <div className="flex border-2 border-viridian-500 rounded-[10px]">
        <div className="relative flex flex-col justify-between items-center pt-[16px] pb-[16px] bg-viridian-500 w-[133px] rounded-l-[10px] text-white font-[500] text-xl ">
          <div>Период</div>
          <div>Всего</div>
          <div>Риски</div>
        </div>
        <div className=" flex overflow-clip max-w-[1120px]" ref={containerRef}>
          <div
            className="relative flex flex-row h-[158px] transition-[left] duration-300"
            ref={innerRef}
            style={{ left: pos }}
          >
            {data.map((el) => {
              elCount += 1;
              return (
                <div
                  className="flex flex-row items-center"
                  key={"hist-card-container-" + elCount}
                >
                  {card({ date: el.date, total: el.total, risks: el.risks })}
                  {elCount !== data.length ? (
                    <div
                      className="w-[2px] h-[124px] bg-inactive/40"
                      key={"hist-card-line-" + elCount}
                    ></div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CarouselRightArrow
        func={arrowFunc}
        element={innerRef}
        step={-1000}
        disable={false}
        secondEl={containerRef}
      ></CarouselRightArrow>
    </div>
  );
}
