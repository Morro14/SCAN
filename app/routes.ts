import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/home.tsx", [
		index("routes/main.tsx"),
		route("test", "routes/testRedux.tsx"),
		layout("routes/auth/layout.tsx", [
			route("signin", "routes/auth/signin.tsx"),
			route("signup", "routes/auth/signup.tsx"),
		]),
		layout("routes/protected.tsx", [
			route("search", "routes/search.tsx"),
			route("results", "routes/results.tsx"),
		]),
	]),
] satisfies RouteConfig;
