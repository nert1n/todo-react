import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setList, setLoading } from "@app/store/slices/todo-lists-slice.tsx";
import { RootState } from "@app/store/store.ts";
import { getTodoListWithTodos } from "@shared/utils/get-todo-lists-by-id.ts";
import { TodosList } from "@widgets/todos-list/ui/todos-list.tsx";

export const TodoList = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	const { list, loading } = useSelector((state: RootState) => state.todoLists);

	useEffect(() => {
		const fetchTodoLists = async () => {
			try {
				dispatch(setLoading(true));
				const lists = await getTodoListWithTodos(id?.toString() || "");
				dispatch(setList(lists.todos));
				dispatch(setLoading(false));
			} catch (err) {
				console.error("Error fetching todo lists:", err);
				dispatch(setLoading(false));
			}
		};

		if (id) fetchTodoLists();
	}, [id, dispatch]);

	return (
		<div>
			{loading ? <p>Loading...</p> : <TodosList id={id || ""} list={list} />}
		</div>
	);
};
