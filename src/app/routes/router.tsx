import Layout from "@app/layout";
import AuthProvider from "@app/layout/authProvider";
import MainLayout from "@app/layout/mainLayout";
import PrivateLayout from "@app/layout/privateLayout";
import { authRoutes } from "@app/routes/auth-routes.tsx";
import { privateRoutes } from "@app/routes/private-routes.tsx";
import { ErrorPage } from "@pages/error";
import { NotFoundPage } from "@pages/not-found";

export const routes = [
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage errorText={"Error with router!"} />,
		children: [
			{
				element: <AuthProvider />,
				children: authRoutes,
			},
			{
				element: <MainLayout />,
				children: [
					{
						element: <PrivateLayout />,
						children: privateRoutes,
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
