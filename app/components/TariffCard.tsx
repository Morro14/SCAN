import iconBeginner from "../media/tariff-beginner-icon.svg";
import iconPro from "../media/tariff-pro-icon.svg";
import iconBuisness from "../media/tariff-buisness-icon.svg";
import tick from "../media/tick.svg";
import { useAppSelector } from "~/redux/hooks";
import { selectAuth } from "~/redux/authSlice";
export default function TarrifCard({
  category,
  active,
}: {
  category: "beginner" | "pro" | "buisness";
  active: boolean;
}) {
  const auth = useAppSelector(selectAuth);
  const variables = {
    beginner: {
      color: "bg-orange-501",
      headerText: "Для небольшого исследования",
      icon: {
        name: iconBeginner,
        pos: { t: "top-[11px]", r: "right-[16px]" },
        size: { w: "w-[92px]", h: "h-[83px]" },
      },
      price: "799 ₽",
      priceLineThrough: "1 200 ₽",
      text1: "или 150 ₽/мес. при рассрочке на 24 мес.",
      bulletPoints: {
        1: "Безлимитная поддержка",
        2: "Безопасная сделка",
        3: "Поддержка 24/7",
      },
    },
    pro: {
      color: "bg-sky-501",
      headerText: "Для HR и фрилансеров",
      icon: {
        name: iconPro,
        pos: { t: "top-[-4px]", r: "right-[12px]" },
        size: { w: "w-[121px]", h: "" },
      },
      price: "1 299 ₽",
      priceLineThrough: "2 600 ₽",
      text1: "или 279 ₽/мес. при рассрочке на 24 мес.",
      bulletPoints: {
        1: "Все пункты тарифа Beginner",
        2: "Экспорт истории",
        3: "Рекомендации по приоритетам",
      },
    },
    buisness: {
      color: "bg-black",
      headerText: "Для корпоративных клиентов",
      icon: {
        name: iconBuisness,
        pos: { t: "top-[23px]", r: "right-[5px]" },
        size: { w: "w-[96px]", h: "h-[80px]" },
      },
      price: "2 379 ₽",
      priceLineThrough: "3 700 ₽",
      text1: "",
      bulletPoints: {
        1: "Все пункты тарифа Pro",
        2: "Безлимитное количество запросов",
        3: "Приоритетная поддержка",
      },
    },
  };
  const styleString = `${variables[category].icon.size.w} ${variables[category].icon.size.h}`;
  const activeBorder = active
    ? "w-[415px] h-[546px] rounded-[10px] shadowed outline-2 outline-orange-501"
    : "w-[415px] h-[546px] rounded-[10px] shadowed";
  return (
    <div className={activeBorder}>
      <div
        className={`${variables[category].color} h-[132px] rounded-t-[10px]`}
      >
        <div className="flex flex-row justify-between">
          <div
            className={
              "ml-[30px] " +
              "mt-[30px] " +
              (category === "buisness" ? "text-white" : "text-black")
            }
          >
            <h3 className="text-3xl font-medium">
              {category.slice(0, 1).toUpperCase() + category.slice(1)}
            </h3>

            <div className="text-lg mt-[10px] font-normal">
              {variables[category].headerText}
            </div>
          </div>
          <div
            className={`relative ${variables[category].icon.size.w} ${variables[category].icon.size.h} ${variables[category].icon.pos.t} ${variables[category].icon.pos.r}`}
          >
            <img
              src={variables[category].icon.name}
              alt={"icon" + "-" + category}
            />
          </div>
        </div>
      </div>

      <div className="pl-[30px]">
        <div className="flex flex-row justify-end">
          {active ? (
            <div
              className={
                "flex justify-center items-center mt-[12px] mr-[10px] w-[134px] h-[24px] rounded-[10px] bg-[#3BA5E0] "
              }
            >
              <div className="text-sm text-white">{"Текущий тариф"}</div>
            </div>
          ) : (
            <div
              className={
                "flex justify-center items-center mt-[12px] mr-[10px] w-[134px] h-[24px] rounded-[10px] "
              }
            >
              <div className="text-sm text-white"></div>
            </div>
          )}
        </div>
        <div className="flex flex-row relative top-[-3px]">
          <div className="text-3xl font-medium mr-[19px]">
            {variables[category].price}
          </div>
          <div className="text-[25px] font-medium text-black/50 line-through">
            {variables[category].priceLineThrough}
          </div>
        </div>
        <div className="text-lg">или 150 ₽/мес. при рассрочке на 24 мес.</div>
        <div className="mt-[59px] h-max-[110px]">
          <div className="font-medium text-xl mb-[10px]">В тариф входит:</div>
          <div className="text-lg">
            <div className="flex flex-row items-center h-[22px]">
              <img
                src={tick}
                alt="tick"
                className="mr-[8px] h-[20px] w-[20px]"
              />
              <div>{variables[category].bulletPoints[1]}</div>
            </div>
            <div className="flex flex-row items-center h-[22px] mt-[5px]">
              <img
                src={tick}
                alt="tick"
                className="mr-[8px] h-[20px] w-[20px]"
              />
              <div>{variables[category].bulletPoints[2]}</div>
            </div>
            <div className="flex flex-row items-center h-[22px] mt-[5px]">
              <img
                src={tick}
                alt="tick"
                className="mr-[8px] h-[20px] w-[20px]"
              />
              <div>{variables[category].bulletPoints[3]}</div>
            </div>
          </div>
        </div>

        {auth && active ? (
          <button className="btn w-[355px] h-[59px] bg-[#D2D2D2] rounded-[5px] text-xl mt-[55px]">
            Перейти в личный кабинет
          </button>
        ) : (
          <button className="btn w-[355px] h-[59px] bg-blue-501 rounded-[5px] text-xl text-white mt-[55px]">
            Подробнее
          </button>
        )}
      </div>
    </div>
  );
}
