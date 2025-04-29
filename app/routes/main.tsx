import TarrifCard from "~/components/TariffCard";
import img1 from "../media/main-img-1.svg";
import img2 from "../media/main-img-2.svg";
import CarouselMain from "~/components/carousel/CarouselMain";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/redux/hooks";
import { selectAuth } from "~/redux/authSlice";
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
	// setting user's tariff for testing
	const userTariff = "beginner";

	return (
		<div>
			<div className="md:flex md:flex-row md:justify-between mt-[69px]">
				<div>
					<h1 className="main-headline-2 text-nowrap">
						сервис по поиску <br />
						публикаций <br />о компании <br />
						по его ИНН
					</h1>
					<div className="md:text-xl text-[18px] mt-[20px] font-[400]">
						Комплексный анализ публикаций, получение данных <br />в формате PDF
						на электронную почту.
					</div>

					{auth === "true" ? (
						<Button
							onClickFunc={handleSearchBtn}
							loadingState={loading}
							text="Запросить данные"
						></Button>
					) : (
						<div></div>
					)}
				</div>

				<img
					src={img1}
					alt="main-img-1"
					className="md:w-[629px] w-[347x] mt-[24px] md:mt-[0px] md:h-[593px]"
				/>
			</div>
			<h2 className="main-headline-2 md:mt-[0px] mt-[55px] ">
				Почему именно мы
			</h2>
			<div className="md:static md:left-0 relative left-[6px]">
				<CarouselMain></CarouselMain>
				{/* <CustomCarousel></CustomCarousel> */}
			</div>
			<div className="md:overflow-auto overflow-clip">
				<img
					src={img2}
					alt="main-img-2"
					className="ml-[-9px] md:mt-[50px] mt-[80px] md:w-[1307px] min-w-[891px] md:static relative left-[-2px]"
				/>
			</div>
			<div>
				<h2 className="main-headline-2 mt-[80px]">Наши тарифы</h2>
				<div className="flex md:flex-row flex-col justify-between md:mt-0 mt-[-6px]">
					<TarrifCard
						category="beginner"
						active={auth === "true" && userTariff === "beginner"}
					></TarrifCard>
					<TarrifCard
						category="pro"
						active={false}
					></TarrifCard>
					<TarrifCard
						category="buisness"
						active={false}
					></TarrifCard>
				</div>
			</div>
		</div>
	);
}
