import { useState } from "react";

import { Modal } from "@entities/modal/ui/modal.tsx";
import { TodoElement } from "@features/todoElement/ui/todo-element.tsx";
import { ITodosList } from "@widgets/todos-list/model/types.ts";

export const TodosList = ({ list }: ITodosList) => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const handleAddTask = () => {
		setIsAddModalOpen(true);
	};

	const handleCloseAddModal = () => {
		setIsAddModalOpen(false);
	};

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
			<Modal
				isOpen={isAddModalOpen}
				title={"Add new task"}
				onClose={handleCloseAddModal}>
				1
			</Modal>
			<button onClick={handleAddTask}>Add new task</button>
		</div>
	);
};
