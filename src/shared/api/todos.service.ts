import { addDoc, collection } from "firebase/firestore";

import { db } from "@app/index";
import { ITodoElement } from "@features/todoElement/model/types.ts";

export const TodosService = {
	async createTodo(listId: string, todo: ITodoElement) {
		const newTodo = {
			title: todo.title,
			description: todo.description,
			createdBy: todo.createdBy,
			editedBy: todo.editedBy,
			completed: todo.completed || false,
		};
		return await addDoc(collection(db, `todosLists/${listId}/todos`), newTodo);
	},
	async createTodoList(title: string) {
		const newTodoList = {
			title,
			todos: [],
		};
		return await addDoc(collection(db, "todosLists"), newTodoList);
	},
};
