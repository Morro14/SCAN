import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/home.tsx", [
		index("routes/main.tsx"),
		route("login", "routes/auth/login.tsx"),
		route("register", "routes/auth/register.tsx"),
		route("search", "routes/search.tsx"),
	]),
] satisfies RouteConfig;
