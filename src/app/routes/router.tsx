import Layout from "@app/layout";
import PrivateLayout from "@app/layout/privateLayout";
import { privateRoutes } from "@app/routes/private-routes.tsx";
import { ErrorPage } from "@pages/error";
import { LoginPage } from "@pages/login";
import { NotFoundPage } from "@pages/not-found";
import { RegisterPage } from "@pages/register";

export const routes = [
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage errorText={"Error with router!"} />,
		children: [
			{
				path: "sign-in",
				element: <LoginPage />,
			},
			{
				path: "sign-up",
				element: <RegisterPage />,
			},
			{
				element: <PrivateLayout />,
				children: privateRoutes,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
