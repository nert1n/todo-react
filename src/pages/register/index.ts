import { lazy } from "react";

export const RegisterPage = lazy(() =>
	import("./ui/register.tsx").then(module => ({ default: module.Register }))
);
