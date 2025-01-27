import { lazy } from "react";

export const TodoListPage = lazy(() =>
	import("./ui/todo-list.tsx").then(module => ({ default: module.TodoList }))
);
