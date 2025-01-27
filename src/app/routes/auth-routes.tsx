import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";

export const authRoutes = [
	{
		path: "sign-in",
		element: <LoginPage />,
	},
	{
		path: "sign-up",
		element: <RegisterPage />,
	},
];
