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
          {userInfo && !loading ? userInfo?.count : "loading"}
        </div>
      </div>
      <div className="flex flex-row items-center justify-end">
        <div className="text-[10px] text-gray-950/40 ">Лимит по компаниям</div>
        <div className="text-[14px] text-[#8AC540] font-bold ml-[9px]">
          {userInfo && !loading ? userInfo?.limit : "loading"}
        </div>
      </div>
    </div>
  );
}
