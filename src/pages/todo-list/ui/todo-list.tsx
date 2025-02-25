import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setList, setLoading } from "@app/store/slices/todo-lists-slice.tsx";
import { RootState } from "@app/store/store.ts";
import { TodosService } from "@shared/api/todos.service.ts";
import { Loader } from "@shared/ui";
import { TodosList } from "@widgets/todos-list/ui/todos-list.tsx";

export const TodoList = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	const { isUpdated, list, loading } = useSelector(
		(state: RootState) => state.todoLists
	);

	useEffect(() => {
		const fetchTodoLists = async () => {
			try {
				dispatch(setLoading(true));
				const lists = await TodosService.getTodoList(id?.toString() || "");
				dispatch(setList(lists.todos));
			} catch (err) {
				console.error("Error fetching todo lists:", err);
			} finally {
				dispatch(setLoading(false));
			}
		};

		if (id) fetchTodoLists();
	}, [id, dispatch, isUpdated]);

	return (
		<div>{loading ? <Loader /> : <TodosList id={id || ""} list={list} />}</div>
	);
};
