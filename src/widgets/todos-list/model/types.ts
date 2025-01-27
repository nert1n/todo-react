import { ITodoElement } from "@features/todoElement/model/types.ts";

export interface ITodosList {
	id: string;
	list: ITodoElement[];
}
