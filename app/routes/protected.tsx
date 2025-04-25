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

  console.log("prot", "auth", auth);

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
