import TarrifCard from "~/components/TariffCard";
import img1 from "../media/main-img-1.svg";
import img2 from "../media/main-img-2.svg";
import CustomCarousel from "~/components/carousel/Carousel";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/redux/hooks";
import { selectToken } from "~/redux/authSlice";

export default function Main() {
  const nav = useNavigate();
  const handleSearch = () => {
    nav("/search");
  };
  const auth = useAppSelector(selectToken);
  let userTariff = "";

  if (auth) {
    userTariff = "beginner";
  }
  let button: any = <></>;
  if (auth) {
    button = (
      <button
        onClick={handleSearch}
        className="btn w-[335px] h-[59px] rounded-[5px] bg-blue-501 mt-[70px] text-white"
      >
        Запросить данные
      </button>
    );
  }
  return (
    <div>
      <div className="flex flex-row justify-between mt-[69px]">
        <div>
          <h1 className="font-ferry text-6xl">
            сервис по поиску <br />
            публикаций <br />о компании <br />
            по его ИНН
          </h1>
          <div className="text-xl mt-[20px]">
            Комплексный анализ публикаций, получение данных <br />в формате PDF
            на электронную почту.
          </div>

          {button}
        </div>

        <img src={img1} alt="main-img-1" className="w-[629px] h-[593px]" />
      </div>
      <h2 className="main-headline-2">Почему именно мы</h2>
      <CustomCarousel></CustomCarousel>
      <div>
        <img src={img2} alt="main-img-2" className="ml-[-9px] mt-[50px]" />
      </div>
      <div>
        <h2 className="main-headline-2">Наши тарифы</h2>
        <div className="flex flex-row justify-between">
          <TarrifCard
            category="beginner"
            active={userTariff === "beginner"}
          ></TarrifCard>
          <TarrifCard category="pro" active={userTariff === "pro"}></TarrifCard>
          <TarrifCard
            category="buisness"
            active={userTariff === "buisness"}
          ></TarrifCard>
        </div>
      </div>
    </div>
  );
}
