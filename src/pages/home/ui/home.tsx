import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Modal } from "@entities/modal/ui/modal.tsx";
import { Button, Input } from "@shared/ui";
import { createTodoList } from "@shared/utils/create-todo-list.ts";
import { getTodoLists } from "@shared/utils/get-todo-lists.ts";

type NewListInputs = {
	title: string;
};

export const Home = () => {
	const [isCreateNewListModalOpen, setIsCreateNewListModalOpen] =
		useState(false);

	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<NewListInputs>();

	const [todoLists, setTodoLists] = useState<
		{ id: string; title: string; todos: string[] }[]
	>([]);

	const handleOpenModal = () => {
		setIsCreateNewListModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsCreateNewListModalOpen(false);
	};

	const handleCreateList = (title: string) => {
		createTodoList(title);
		handleCloseModal();
	};

	const onSubmit = (data: NewListInputs) => {
		handleCreateList(data.title);
	};

	useEffect(() => {
		const fetchTodoLists = async () => {
			try {
				const lists = await getTodoLists();
				setTodoLists(lists);
			} catch (err) {
				console.error("Error fetching todo lists:", err);
			}
		};
		fetchTodoLists();
	}, []);

	return (
		<div
			className={
				"flex flex-col justify-center gap-4 font-medium max-w-[600px] mx-auto"
			}>
			<h1 className={"flex justify-center text-3xl"}>List of all todo lists</h1>
			<ul
				className={
					"flex flex-row justify-start mx-auto w-full max-w-[600px] bg-white h-full rounded-2xl p-4 gap-2"
				}>
				{todoLists.map((list, id) => (
					<Link
						key={Number(list.id) | id}
						className={"bg-amber-100 w-max p-3 rounded-2xl hover:bg-amber-200"}
						to={`/list/${list.id}`}>
						{list.title}
					</Link>
				))}
			</ul>
			<Modal
				isOpen={isCreateNewListModalOpen}
				title={"Create new list"}
				onClose={handleCloseModal}>
				<form
					className={"flex flex-col gap-2"}
					onSubmit={handleSubmit(onSubmit)}>
					<Input
						{...register("title", {
							required: "Title is required",
						})}
						name="title"
						placeholder="Enter list title"
					/>
					{errors.title && (
						<div className="text-red-500 text-sm">
							{errors.title.message?.toString()}
						</div>
					)}
					<Button type={"submit"}>Create</Button>
				</form>
			</Modal>
			<Button onClick={handleOpenModal}>Create new list</Button>
		</div>
	);
};
