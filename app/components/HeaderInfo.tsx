import Spinner from "./util/Spinner";
import getUserInfo from "~/requests/userInfo";
import { useState } from "react";
import type { UserInfo } from "~/redux/userInfoSlice";
import { useGlobalContext } from "./ContextProvider";

export default function HeaderInfo() {
  const [loading, setLoading] = useState(true);
  const context = useGlobalContext();
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null);

  async function getUserInfo_() {
    const data = await getUserInfo();
    setUserInfo({
      count: data.eventFiltersInfo.usedCompanyCount,
      limit: data.eventFiltersInfo.companyLimit,
      actualData: true,
    });
    setLoading(false);
  }

  if (!userInfo) {
    getUserInfo_();
  }

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
        <div className="text-[14px] font-bold ml-[9px]">{userInfo?.count}</div>
      </div>
      <div className="flex flex-row items-center justify-end">
        <div className="text-[10px] text-gray-950/40 ">Лимит по компаниям</div>
        <div className="text-[14px] text-[#8AC540] font-bold ml-[9px]">
          {userInfo?.limit}
        </div>
      </div>
    </div>
  );
}
