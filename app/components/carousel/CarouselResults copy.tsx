import CarouselRightArrow from "./CarouselRightArrow";
import CarouselLeftArrow from "./CarouselLeftArrow";
import { useEffect, useRef, useState } from "react";

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

  function arrowFunc(step: number) {
    const containerW = refs.containerRef.current.offsetWidth;
    const innerWidth = refs.innerRef.current.offsetWidth;
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
        setPos(0);
      }
    } else if (stepW && step > 0) {
      setPos(pos + stepW);
    }
  }

  return (
    <div className="flex flex-row items-center justify-center mt-[27px]">
      <CarouselLeftArrow
        func={arrowFunc}
        element={innerRef}
        step={1000}
        disable={false}
        secondEl={containerRef}
      ></CarouselLeftArrow>
      <div className="flex grow border-2 border-viridian-500 rounded-[10px]">
        <div className=" flex overflow-clip max-w-[1120px]" ref={containerRef}>
          <div
            className="relative flex flex-row h-[158px] transition-[left] duration-300"
            ref={innerRef}
            style={{ left: pos }}
          >
            {}
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
