import { lazy } from "react";

export const LoginPage = lazy(() =>
	import("./ui/login.tsx").then(module => ({ default: module.Login }))
);
