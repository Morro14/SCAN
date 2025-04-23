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
  console.log("main auth", auth);

  const userTariff = "beginner";

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
          <Button
            onClickFunc={handleSearchBtn}
            loadingState={loading}
            text="Запросить данные"
          ></Button>
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
          <TarrifCard category="pro" active={false}></TarrifCard>
          <TarrifCard category="buisness" active={false}></TarrifCard>
        </div>
      </div>
    </div>
  );
}
