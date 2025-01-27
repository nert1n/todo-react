import { collection, addDoc } from "firebase/firestore";

import { db } from "@app/index";

export const addTodoList = async (title: string) => {
	await addDoc(collection(db, "todoLists"), {
		title,
		todos: [],
	});
};
