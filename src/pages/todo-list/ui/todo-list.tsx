import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { db } from "@app/index";
import { mockTodoList } from "@shared/mock/mock-todo-list.ts";
import { TodosList } from "@widgets/todos-list/ui/todos-list.tsx";

export const TodoList = () => {
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const getTodos = async () => {
			const q = query(collection(db, "todos"), where("categoryId", "==", id));
			const querySnapshot = await getDocs(q);
			const todos: { id: string }[] = [];

			querySnapshot.forEach(doc => {
				const todo = { id: doc.id, ...doc.data() };
				todos.push(todo);
			});

			console.log(todos);
		};

		getTodos();
	}, []);

	return (
		<div>
			<h1>TodoList page with ID: {id}</h1>
			<TodosList list={mockTodoList} />
		</div>
	);
};
