import { addDoc, collection } from "firebase/firestore";

import { db } from "@app/index";

export const createTodoList = async (title: string) => {
	if (!title) return;

	const newTodoList = {
		title,
		todos: [],
	};

	await addDoc(collection(db, "todosLists"), newTodoList);
};
