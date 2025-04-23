import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "~/redux/hooks";
import {
  authReducer,
  selectAuth,
  selectRedirect,
  selectToken,
} from "~/redux/authSlice";
import { useAppDispatch } from "~/redux/hooks";
import { useLocation } from "react-router";
import Loading from "~/components/Loading";

export default function PrivatRoute() {
  const loc = useLocation();

  const auth = useAppSelector(selectAuth);

  let redirectS = useAppSelector(selectRedirect);
  console.log("prot", "auth", auth, "redirect", redirectS);
  let redirect = "/";
  // if (redirectS) {
  //   redirect = redirectS;
  // } else if (
  //   (loc.pathname === "/results" ||
  //     loc.pathname === "/search" ||
  //     loc.pathname === "/main/auth") &&
  //   auth === "false"
  // ) {
  //   redirect = "/signin";
  // }

  // const dispatch = useAppDispatch();
  // let navElement = <></>;
  // if (auth === "false") {
  //   navElement = <Navigate to={redirect}></Navigate>;
  // } else if (auth === "pending") {
  //   navElement = <Loading />;
  // }
  // if (redirect) {
  //   dispatch(authReducer({ redirect: null }));
  // }

  return auth === "true" ? (
    <>
      <Outlet></Outlet>
    </>
  ) : auth === "pending" ? (
    <Loading></Loading>
  ) : auth === "false" ? (
    <Navigate to={"/signin"}></Navigate>
  ) : (
    <>???</>
  );
}
