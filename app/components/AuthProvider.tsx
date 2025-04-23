import { createContext, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { selectToken, authReducer, selectAuth } from "~/redux/authSlice";

const AuthContext = createContext<{
  auth: string | null;
} | null>(null);

export default function AuthProvider({ children }: { children: any }) {
  const [auth, setAuth] = useState<"true" | "false" | "pending">("pending");
  const dispatch = useAppDispatch();
  const authS = useAppSelector(selectAuth);
  console.log("auth provider", auth, authS);
  useEffect(() => {
    if (
      auth !== "true" &&
      authS !== "true" &&
      sessionStorage.getItem("token")
    ) {
      console.log("getting token from storage");
      setAuth("true");
    } else if (auth !== "true" && !sessionStorage.getItem("token")) {
      sessionStorage.clear();
      setAuth("false");
    }
    if (authS !== auth) {
      dispatch(authReducer({ auth: auth }));
    }
  }, [auth, authS, setAuth]);

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
