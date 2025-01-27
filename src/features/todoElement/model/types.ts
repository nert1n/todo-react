export interface ITodoElement {
	id?: string;
	listId?: string;
	title: string;
	description: string;
	createdBy?: string;
	editedBy?: string;
	completed?: boolean;
}
