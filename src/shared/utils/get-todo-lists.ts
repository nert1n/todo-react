import { collection, getDocs } from "firebase/firestore";

import { db } from "@app/index";

export const getTodoLists = async () => {
	const querySnapshot = await getDocs(collection(db, "todosLists"));
	return querySnapshot.docs.map(doc => ({
		id: doc.id,
		title: doc.data().title,
		todos: doc.data().todos,
	}));
};
