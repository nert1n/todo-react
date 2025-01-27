import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ITodoElement } from "@features/todoElement/model/types.ts";
import { getTodoListWithTodos } from "@shared/utils/get-todo-lists-by-id.ts";
import { TodosList } from "@widgets/todos-list/ui/todos-list.tsx";

export const TodoList = () => {
	const { id } = useParams<{ id: string }>();
	const [todoList, setTodoList] = useState<ITodoElement[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTodoLists = async () => {
			try {
				const lists = await getTodoListWithTodos(id?.toString() || "");
				setTodoList(lists.todos);
			} catch (err) {
				console.error("Error fetching todo lists:", err);
				setError("Failed to load the list of todos.");
			}
		};

		if (id) fetchTodoLists();
	}, [id]);

	return (
		<div>
			{error ? <p>{error}</p> : <TodosList id={id || ""} list={todoList} />}
		</div>
	);
};
