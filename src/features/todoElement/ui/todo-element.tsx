import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { deleteTodo, updateTodo } from "@app/store/slices/todo-lists-slice.tsx";
import { Modal } from "@entities/modal/ui/modal.tsx";
import { ITodoElement } from "@features/todoElement/model/types.ts";
import { Button, Input } from "@shared/ui";
import { deleteTodoFromList } from "@shared/utils/delete-todo.ts";
import { updateTodoInList } from "@shared/utils/update-todo.ts";

export const TodoElement = ({
	completed,
	description,
	id,
	listId,
	title,
}: ITodoElement) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const dispatch = useDispatch();

	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm({
		defaultValues: {
			title: title,
			description: description,
			completed: completed ?? false,
		},
	});

	const handleCloseModal = () => {
		setIsDeleting(false);
		setIsEditing(false);
		setIsModalOpen(false);
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleOpenEditing = () => {
		setIsEditing(true);
		handleOpenModal();
	};

	const handleOpenDeleting = () => {
		setIsDeleting(true);
		handleOpenModal();
	};

	const handleDeleteTask = () => {
		dispatch(deleteTodo(id || ""));
		deleteTodoFromList(listId || "", id || "");
		handleCloseModal();
	};

	const handleEditTask = (data: {
		title: string;
		description: string;
		completed: boolean;
	}) => {
		dispatch(updateTodo({ id, listId, ...data }));
		updateTodoInList(listId || "", id || "", data);
		handleCloseModal();
	};

	const handleEditCheckbox = () => {
		dispatch(
			updateTodo({ id, listId, title, description, completed: !completed })
		);
		updateTodoInList(listId || "", id || "", {
			title,
			description,
			completed: !completed,
		});
	};

	return (
		<div className="flex flex-row w-full justify-between gap-2 rounded-2xl bg-white shadow py-3 px-4">
			{isDeleting && (
				<Modal
					isOpen={isModalOpen}
					title={"Deleting"}
					onClose={handleCloseModal}>
					<div className="flex flex-col gap-3">
						<h3>Are you sure you want to delete the task?</h3>
						<div className="w-full flex flex-row gap-2 justify-center">
							<Button onClick={handleCloseModal}>No</Button>
							<Button onClick={handleDeleteTask}>Yes</Button>
						</div>
					</div>
				</Modal>
			)}

			{isEditing && (
				<Modal
					isOpen={isModalOpen}
					title={"Editing"}
					onClose={handleCloseModal}>
					<form
						className="flex flex-col gap-3"
						onSubmit={handleSubmit(handleEditTask)}>
						<div>
							<Input
								placeholder={"Title"}
								{...register("title", { required: "Title is required" })}
							/>
							{errors.title && (
								<span className="text-red-500 text-sm">
									{errors.title.message}
								</span>
							)}
							<Input
								placeholder={"Description"}
								{...register("description", {
									required: "Description is required",
								})}
							/>
							{errors.description && (
								<span className="text-red-500 text-sm">
									{errors.description.message}
								</span>
							)}
							<div className="flex items-center">
								<input type="checkbox" {...register("completed")} />
								<span className="ml-2">Completed</span>
							</div>
						</div>
						<Button type="submit">Edit</Button>
					</form>
				</Modal>
			)}

			<div className="flex flex-col">
				<h3 className="text-base">{title}</h3>
				<p className="text-sm">{description}</p>
			</div>

			<div className="flex flex-row gap-2">
				<button className="text-[#4186F4]" onClick={handleOpenEditing}>
					edit
				</button>
				<button className="text-[#F44141]" onClick={handleOpenDeleting}>
					delete
				</button>
				<input
					checked={completed}
					type="checkbox"
					onChange={handleEditCheckbox}
				/>
			</div>
		</div>
	);
};
