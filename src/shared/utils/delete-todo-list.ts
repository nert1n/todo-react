import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@app/index";

export const deleteTodoList = async (listId: string) => {
	if (!listId) return;

	const listRef = doc(db, "todosLists", listId);
	await deleteDoc(listRef);
};
