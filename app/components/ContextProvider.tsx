import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

export type GlobalContext = {
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
};

const GlobalContext = createContext<GlobalContext | null>(null);

export default function CotnextProvider({ children }: any) {
  console.log("provider");
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

  return (
    <>
      <GlobalContext.Provider
        value={{
          authData,
          setAuthData,
          searchData,
          setSearchData,
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
