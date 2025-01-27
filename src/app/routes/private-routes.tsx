import { HomePage } from "@pages/home";
import { TodoListPage } from "@pages/todo-list";

export const privateRoutes = [
	{
		path: "",
		element: <HomePage />,
	},
	{
		path: "/list/:id",
		element: <TodoListPage />,
	},
];
