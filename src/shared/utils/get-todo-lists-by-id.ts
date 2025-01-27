import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import { db } from "@app/index";
import { ITodoElement } from "@features/todoElement/model/types.ts";

export const getTodoListWithTodos = async (listId: string) => {
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
};
