import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from "@app/index";

export const addTodo = async (
	listId: string,
	todo: { id: string; text: string; completed: boolean }
) => {
	const listRef = doc(db, "todosLists", listId);
	await updateDoc(listRef, {
		todos: arrayUnion(todo),
	});
};
