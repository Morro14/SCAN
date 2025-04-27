import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "~/redux/hooks";
import { selectAuth } from "~/redux/authSlice";

import Loading from "~/components/Loading";

export default function PrivatRoute() {
	const auth = useAppSelector(selectAuth);

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
