import { doc, deleteDoc } from "firebase/firestore";

import { db } from "@app/index";

export const deleteTodoFromList = async (listId: string, todoId: string) => {
	try {
		const todoDocRef = doc(db, `todosLists/${listId}/todos/${todoId}`);
		await deleteDoc(todoDocRef);
	} catch (error) {
		console.error("Error deleting todo: ", error);
	}
};
