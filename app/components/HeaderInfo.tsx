import Spinner from "./util/Spinner";
import getUserInfo from "~/requests/userInfo";
import { useState, useEffect } from "react";
import { useAppSelector } from "~/redux/hooks";
import { selectAuth, selectToken } from "~/redux/authSlice";

export default function HeaderInfo() {
  const [loading, setLoading] = useState(false);
  const auth = useAppSelector(selectAuth);
  const [userInfo, setUserInfo] = useState<null | {
    count: number;
    limit: number;
  }>(null);

  async function getUserInfo_() {
    const response = await getUserInfo();
    if (response) {
      setLoading(false);
      setUserInfo({
        count: response.eventFiltersInfo.usedCompanyCount,
        limit: response.eventFiltersInfo.companyLimit,
      });
    }
  }
  useEffect(() => {
    if (!userInfo && auth === "true" && !loading) {
      setLoading(true);
      getUserInfo_();
    }
  }, [userInfo, getUserInfo_, setLoading, auth, loading]);

  return loading ? (
    <div className="flex justify-center items-center flex-col md:w-[175px] w-[111px] md:h-[63px] h-[75px] bg-[#D9D9D9]/40 rounded-[5px] p-[8px]">
      <Spinner></Spinner>
    </div>
  ) : (
    <div className="flex justify-center flex-col md:w-[175px] w-[111px] md:h-[63px] h-[75px] bg-[#D9D9D9]/40 rounded-[5px] p-[8px]">
      <div className="md:flex md:flex-row md:items-center md:justify-end block">
        <div className="md:text-[10px] text-[8px] text-gray-950/40 text-nowrap md:text-wrap">
          Использовано компаний
        </div>
        <div className="text-[14px] font-bold md:ml-[9px]">
          {userInfo && !loading ? userInfo?.count : "loading"}
        </div>
      </div>
      <div className="md:flex md:flex-row md:items-center md:justify-end block">
        <div className="md:text-[10px] text-[8px] text-gray-950/40 text-nowrap md:text-wrap ">
          Лимит по компаниям
        </div>
        <div className="text-[14px] text-[#8AC540] font-bold md:ml-[9px]">
          {userInfo && !loading ? userInfo?.limit : "loading"}
        </div>
      </div>
    </div>
  );
}
