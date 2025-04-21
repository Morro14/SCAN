// import { createContext, useContext, useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "~/redux/hooks";
// import { selectToken, authReducer } from "~/redux/authSlice";

// const AuthContext = createContext<{
//   auth: string | null;
// } | null>(null);

// export default function AuthProvider({ children }: { children: any }) {
//   //   const [auth, setAuth] = useState(false);
//   const dispatch = useAppDispatch();
//   const auth = useAppSelector(selectToken);

//   useEffect(() => {
//     if (!auth && sessionStorage.getItem("token")) {
//       //   setAuth(true);
//       dispatch(authReducer({ token: sessionStorage.getItem("token") }));
//     }
//   }, [auth]);

//   return (
//     <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
//   );
// }

// export const useAuthContext = () => useContext(AuthContext);
