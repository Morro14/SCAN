import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "~/redux/hooks";
import { selectToken } from "~/redux/authSlice";

export default function PrivatRoute() {
  const auth = useAppSelector(selectToken);
  return auth ? (
    <>
      <Outlet></Outlet>
    </>
  ) : (
    <Navigate to={"signin"}></Navigate>
  );
}
