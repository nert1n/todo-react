import { collection, addDoc } from "firebase/firestore";

import { db } from "@app/index";
import { ITodoElement } from "@features/todoElement/model/types.ts";

export const addTodoToList = async (listId: string, todo: ITodoElement) => {
	const newTodo = {
		title: todo.title,
		description: todo.description,
		createdBy: todo.createdBy,
		editedBy: todo.editedBy,
		completed: todo.completed || false,
	};

	try {
		await addDoc(collection(db, `todosLists/${listId}/todos`), newTodo);
	} catch (error) {
		console.error("Error adding todo: ", error);
	}
};
