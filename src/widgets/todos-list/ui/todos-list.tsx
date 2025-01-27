import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { addTodo } from "@app/store/slices/todo-lists-slice.tsx";
import { Modal } from "@entities/modal/ui/modal.tsx";
import { TodoElement } from "@features/todoElement/ui/todo-element.tsx";
import { Button, Input } from "@shared/ui";
import { addTodoToList } from "@shared/utils/create-todo.ts";
import { ITodosList } from "@widgets/todos-list/model/types.ts";

type NewTaskInputs = {
	title: string;
	description: string;
};

export const TodosList = ({ id, list }: ITodosList) => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset,
	} = useForm<NewTaskInputs>();
	const auth = getAuth();
	const currentUser = auth.currentUser;
	const dispatch = useDispatch();

	const handleOpenAddTaskModal = () => {
		setIsAddModalOpen(true);
	};

	const handleCloseAddModal = () => {
		setIsAddModalOpen(false);
		reset();
	};

	const handleAddTask = (title: string, description: string) => {
		if (!currentUser) {
			console.error("User is not authenticated");
			return;
		}

		const createdBy = currentUser.uid;
		const editedBy = createdBy;

		const newTask = {
			title,
			description,
			createdBy,
			editedBy,
			completed: false,
			listId: id,
		};

		addTodoToList(id, newTask);

		dispatch(addTodo(newTask));

		handleCloseAddModal();
	};

	const onSubmit = (data: NewTaskInputs) => {
		handleAddTask(data.title, data.description);
	};

	return (
		<div className="flex flex-col gap-2 w-full max-w-[600px] mx-auto">
			{!!list && list.length === 0 && (
				<h1 className="w-full flex text-2xl justify-center">
					Todo has not been created yet!
				</h1>
			)}
			{list.map((item, index) => (
				<TodoElement
					key={`${item.id}-${index}`}
					completed={item.completed}
					createdBy={item.createdBy}
					description={item.description}
					editedBy={item.editedBy}
					id={item.id}
					listId={id}
					title={item.title}
				/>
			))}
			<Modal
				isOpen={isAddModalOpen}
				title="Add new task"
				onClose={handleCloseAddModal}>
				<form
					className="w-full flex flex-col gap-2"
					onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-1">
						<Input
							placeholder="Title"
							{...register("title", {
								required: "Title is required",
							})}
						/>
						{errors.title && (
							<div className="text-red-500 text-sm">
								{errors.title.message?.toString()}
							</div>
						)}
						<Input
							placeholder="Description"
							{...register("description", {
								required: "Description is required",
							})}
						/>
						{errors.description && (
							<div className="text-red-500 text-sm">
								{errors.description.message?.toString()}
							</div>
						)}
					</div>
					<Button type="submit">Create new to-do</Button>
				</form>
			</Modal>
			<Button onClick={handleOpenAddTaskModal}>Add new task</Button>
		</div>
	);
};
