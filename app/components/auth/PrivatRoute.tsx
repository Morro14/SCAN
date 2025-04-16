import { Navigate, Outlet } from "react-router";
import { useGlobalContext } from "../ContextProvider";

export default function PrivatRoute() {
  const context = useGlobalContext();

  return context?.auth ? (
    <>
      <Outlet></Outlet>
    </>
  ) : (
    <Navigate to={"signin"}></Navigate>
  );
}
