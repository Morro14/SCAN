import img from "../../media/spinner.svg";

export default function Spinner() {
  return (
    <div className="">
      <img src={img} alt="" className="animate-spin h-[50px] w-[50px]" />
    </div>
  );
}
