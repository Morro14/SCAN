import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import type {
  HistogramData,
  HistogramsRequestParams,
} from "~/entities/entities";
import { authReducer, selectToken } from "~/redux/authSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export type GlobalContext = {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<null | string>>;
  authData: { username: boolean; password: boolean };
  setAuthData: React.Dispatch<
    React.SetStateAction<{ username: boolean; password: boolean }>
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
  auth: boolean | null;
  setAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
  histogramData: HistogramData | null;
  setHistogramData: React.Dispatch<React.SetStateAction<null | HistogramData>>;
  searchRequestData: HistogramsRequestParams | null;
  setSearchRequestData: React.Dispatch<
    React.SetStateAction<null | HistogramsRequestParams>
  >;
};

const GlobalContext = createContext<GlobalContext | null>(null);

export default function CotnextProvider({ children }: any) {
  const authState = useAppSelector(selectToken);
  const [authData, setAuthData] = useState({
    username: false,
    password: false,
  });
  const [searchData, setSearchData] = useState({
    inn: false,
    limit: false,
    dateStart: false,
    dateEnd: false,
  });
  const [searchRequestData, setSearchRequestData] =
    useState<HistogramsRequestParams | null>(null);
  const [auth, setAuth] = useState<boolean | null>(false);
  const [histogramData, setHistogramData] = useState<null | HistogramData>(
    null
  );
  const [username, setUsername] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      !authState &&
      !sessionStorage.getItem("token") &&
      (sessionStorage.getItem("username") ||
        sessionStorage.getItem("histograms") ||
        sessionStorage.getItem("searchRequestData"))
    ) {
      sessionStorage.clear();
    }
    if (!authState && sessionStorage.getItem("token")) {
      dispatch(authReducer({ token: sessionStorage.getItem("token") }));
    }
  }, [authState]);
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
          username,
          setUsername,
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
