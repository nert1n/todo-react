import { useState } from "react";

import { Modal } from "@entities/modal/ui/modal.tsx";
import { ITodoElement } from "@features/todoElement/model/types.ts";
import { Button } from "@shared/ui";

export const TodoElement = ({
	completed,
	createdBy,
	description,
	editedBy,
	title,
}: ITodoElement) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	console.log(completed, createdBy, editedBy);

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
		handleCloseModal();
	};

	const handleEditTask = () => {
		handleCloseModal();
	};

	return (
		<div
			className={
				"flex flex-row w-full justify-between gap-2 " +
				"rounded-2xl bg-white shadow py-3 px-4"
			}>
			{isDeleting && (
				<Modal
					isOpen={isModalOpen}
					title={"Deleting"}
					onClose={handleCloseModal}>
					<div className={"flex flex-col gap-3"}>
						<h3>Are you sure you want to delete the task?</h3>
						<div className={"w-full flex flex-row gap-2 justify-center"}>
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
					<div className={"flex flex-col gap-3"}>
						<h3>Are you sure you want to change the task?</h3>
						<div className={"w-full flex flex-row gap-2 justify-center"}>
							<Button onClick={handleCloseModal}>No</Button>
							<Button onClick={handleEditTask}>Yes</Button>
						</div>
					</div>
				</Modal>
			)}
			<div className={"flex flex-col"}>
				<h3 className={"text-base"}>{title}</h3>
				<p className={"text-sm"}>{description}</p>
			</div>
			<div className={"flex flex-row gap-2"}>
				<button
					className={"text-[#4186F4]"}
					onClick={() => handleOpenEditing()}>
					edit
				</button>
				<button
					className={"text-[#F44141]"}
					onClick={() => handleOpenDeleting()}>
					delete
				</button>
				<input type="checkbox" />
			</div>
		</div>
	);
};
