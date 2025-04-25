import TarrifCard from "~/components/TariffCard";
import img1 from "../media/main-img-1.svg";
import img2 from "../media/main-img-2.svg";
import CustomCarousel from "~/components/carousel/Carousel";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/redux/hooks";
import { selectAuth, selectToken } from "~/redux/authSlice";
import Button from "~/components/util/Buttons";
import { useState } from "react";

export default function MainAuth() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handleSearchBtn = () => {
    setLoading(true);
    nav("/search");
  };
  const auth = useAppSelector(selectAuth);

  const userTariff = "beginner";

  return (
    <div>
      <div className="md:flex md:flex-row md:justify-between mt-[69px]">
        <div>
          <h1 className="font-ferry md:text-6xl text-[28px] text-nowrap">
            сервис по поиску <br />
            публикаций <br />о компании <br />
            по его ИНН
          </h1>
          <div className="md:text-xl text-[18px] mt-[20px] font-[400]">
            Комплексный анализ публикаций, получение данных <br />в формате PDF
            на электронную почту.
          </div>

          <Button
            onClickFunc={handleSearchBtn}
            loadingState={loading}
            text="Запросить данные"
          ></Button>
        </div>

        <img
          src={img1}
          alt="main-img-1"
          className="md:w-[629px] w-[347x] mt-[24px] md:mt-[0px] md:h-[593px]"
        />
      </div>
      <h2 className="md:main-headline-2 font-ferry md:mt-[0px] mt-[55px] text-[28px]">
        Почему именно мы
      </h2>
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
          <TarrifCard category="pro" active={false}></TarrifCard>
          <TarrifCard category="buisness" active={false}></TarrifCard>
        </div>
      </div>
    </div>
  );
}
