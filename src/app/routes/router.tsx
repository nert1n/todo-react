import Layout from "@app/layout";
import PrivateLayout from "@app/layout/privateLayout";
import { ErrorPage } from "@pages/error";
import { HomePage } from "@pages/home";
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
				children: [
					{
						path: "",
						element: <HomePage />,
					},
				],
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];
