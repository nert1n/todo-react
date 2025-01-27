import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@app/index";
import { ITodoElement } from "@features/todoElement/model/types.ts";

export const updateTodoInList = async (
	listId: string,
	todoId: string,
	updatedTodo: ITodoElement
) => {
	const auth = getAuth();
	const currentUserId = auth.currentUser?.uid;

	try {
		const todoDocRef = doc(db, `todosLists/${listId}/todos/${todoId}`);
		await updateDoc(todoDocRef, {
			title: updatedTodo.title,
			description: updatedTodo.description,
			completed: updatedTodo.completed,
			editedBy: currentUserId,
		});
		console.log("Todo updated successfully");
	} catch (error) {
		console.error("Error updating todo: ", error);
	}
};
