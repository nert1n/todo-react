import { TodoElement } from "@features/todoElement/ui/todo-element.tsx";
import { ITodosList } from "@widgets/todos-list/model/types.ts";

export const TodosList = ({ list }: ITodosList) => {
	return (
		<div className={"flex flex-col gap-2 w-full max-w-[600px] mx-auto"}>
			{list.map((item, id) => (
				<TodoElement
					key={Number(item.createdBy) | id}
					completed={item.completed}
					createdBy={item.createdBy}
					description={item.description}
					editedBy={item.editedBy}
					title={item.title}
				/>
			))}
		</div>
	);
};
