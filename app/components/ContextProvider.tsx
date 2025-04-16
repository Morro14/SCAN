import { createContext, useContext } from "react";
import { useState } from "react";

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
  auth: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [auth, setAuth] = useState(sessionStorage?.getItem("token") || null);

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
