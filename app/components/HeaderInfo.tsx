import Spinner from "./util/Spinner";
import getUserInfo from "~/requests/userInfo";
import { useState } from "react";
import type { UserInfo } from "~/redux/userInfoSlice";
import { useAppSelector } from "~/redux/hooks";
import { selectToken } from "~/redux/authSlice";

export default function HeaderInfo() {
  const [loading, setLoading] = useState(true);
  const auth = useAppSelector(selectToken);
  const [userInfo, setUserInfo] = useState<null | UserInfo | "loading">(null);

  if (!userInfo && auth) {
    setUserInfo("loading");
    getUserInfo_();
  }
  async function getUserInfo_() {
    const data = await getUserInfo();

    if (data) {
      setUserInfo({
        count: data.eventFiltersInfo.usedCompanyCount,
        limit: data.eventFiltersInfo.companyLimit,
        actualData: true,
      });
      setLoading(false);
    }
  }
  // useEffect(() => {
  //   if (!userInfo && context?.auth) {
  //     const data = getUserInfo_();
  //   }
  // }, [userInfo, getUserInfo_]);
  return loading ? (
    <div className="flex justify-center items-center flex-col w-[175px] h-[63px] bg-[#D9D9D9]/40 rounded-[5px] p-[8px]">
      <Spinner></Spinner>
    </div>
  ) : (
    <div className="flex justify-center flex-col w-[175px] h-[63px] bg-[#D9D9D9]/40 rounded-[5px] p-[8px]">
      <div className="flex flex-row items-center justify-end">
        <div className="text-[10px] text-gray-950/40 ">
          Использовано компаний
        </div>
        <div className="text-[14px] font-bold ml-[9px]">
          {userInfo && userInfo !== "loading" ? userInfo?.count : "loading"}
        </div>
      </div>
      <div className="flex flex-row items-center justify-end">
        <div className="text-[10px] text-gray-950/40 ">Лимит по компаниям</div>
        <div className="text-[14px] text-[#8AC540] font-bold ml-[9px]">
          {userInfo && userInfo !== "loading" ? userInfo?.limit : "loading"}
        </div>
      </div>
    </div>
  );
}
