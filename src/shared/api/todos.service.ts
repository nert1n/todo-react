import { getAuth } from "firebase/auth";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";

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
	async deleteTodo(listId: string, todoId: string) {
		const todoDocRef = doc(db, `todosLists/${listId}/todos/${todoId}`);
		return await deleteDoc(todoDocRef);
	},
	async deleteTodoList(listId: string) {
		const listRef = doc(db, "todosLists", listId);
		return await deleteDoc(listRef);
	},
	async getTodoList(listId: string) {
		const listDoc = await getDoc(doc(db, "todosLists", listId));
		if (!listDoc.exists()) throw new Error("Список не найден");

		const todosSnapshot = await getDocs(
			collection(db, `todosLists/${listId}/todos`)
		);

		const todos: ITodoElement[] = todosSnapshot.docs.map(doc => ({
			id: doc.id,
			title: doc.data().title,
			description: doc.data().description,
			createdBy: doc.data().createdBy,
			editedBy: doc.data().editedBy,
			completed: doc.data().completed,
		}));

		return { id: listDoc.id, ...listDoc.data(), todos };
	},
	async getAllTodoLists() {
		const querySnapshot = await getDocs(collection(db, "todosLists"));
		return querySnapshot.docs.map(doc => ({
			id: doc.id,
			title: doc.data().title,
			todos: doc.data().todos,
		}));
	},
	async updateTodo(listId: string, todoId: string, updatedTodo: ITodoElement) {
		const auth = getAuth();
		const currentUserId = auth.currentUser?.uid;

		const todoDocRef = doc(db, `todosLists/${listId}/todos/${todoId}`);

		return await updateDoc(todoDocRef, {
			title: updatedTodo.title,
			description: updatedTodo.description,
			completed: updatedTodo.completed,
			editedBy: currentUserId,
		});
	},
	async updateTodoList(title: string) {
		const newTodoList = {
			title,
			todos: [],
		};
		return await addDoc(collection(db, "todosLists"), newTodoList);
	},
};
