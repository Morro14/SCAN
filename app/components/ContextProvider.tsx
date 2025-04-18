import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import type {
  HistogramData,
  HistogramsRequestParams,
} from "~/entities/entities";

export type GlobalContext = {
  authData: { login: boolean; password: boolean };
  setAuthData: React.Dispatch<
    React.SetStateAction<{ login: boolean; password: boolean }>
  >;
  searchData: {
    inn: boolean;
    limit: boolean;
    dateStart: boolean;
    dateEnd: boolean;
  };
  setSearchData: React.Dispatch<
    React.SetStateAction<{
      inn: boolean;
      limit: boolean;
      dateStart: boolean;
      dateEnd: boolean;
    }>
  >;
  auth: boolean | null | "loading";
  setAuth: React.Dispatch<React.SetStateAction<boolean | null | "loading">>;
  histogramData: HistogramData | null;
  setHistogramData: React.Dispatch<React.SetStateAction<null | HistogramData>>;
  searchRequestData: HistogramsRequestParams | null;
  setSearchRequestData: React.Dispatch<
    React.SetStateAction<null | HistogramsRequestParams>
  >;
};

const GlobalContext = createContext<GlobalContext | null>(null);

export default function CotnextProvider({ children }: any) {
  const [authData, setAuthData] = useState({ login: false, password: false });
  const [searchData, setSearchData] = useState({
    inn: false,
    limit: false,
    dateStart: false,
    dateEnd: false,
  });
  const [searchRequestData, setSearchRequestData] =
    useState<HistogramsRequestParams | null>(null);
  //   const token = useAppSelector(selectToken);
  const [auth, setAuth] = useState<boolean | null | "loading">("loading");
  const [histogramData, setHistogramData] = useState<null | HistogramData>(
    null
  );

  useEffect(() => {
    console.log("provider");
    setAuth(sessionStorage?.getItem("token") ? true : null);
    if (!histogramData && sessionStorage?.getItem("histograms")) {
      const histParse = JSON.parse(
        sessionStorage?.getItem("histograms") as string
      ) as HistogramData;
      setHistogramData(histParse);
    }
    if (!searchRequestData && sessionStorage?.getItem("searchRequestData")) {
      const searchReqParse = JSON.parse(
        sessionStorage?.getItem("searchRequestData") as string
      ) as HistogramsRequestParams;
      setSearchRequestData(searchReqParse);
    }
  }, [
    setAuth,
    setHistogramData,
    histogramData,
    searchRequestData,
    setSearchRequestData,
  ]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          authData,
          setAuthData,
          searchData,
          setSearchData,
          auth,
          setAuth,
          histogramData,
          setHistogramData,
          searchRequestData,
          setSearchRequestData,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
}
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
