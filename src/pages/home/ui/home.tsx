import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Modal } from "@entities/modal/ui/modal.tsx";
import { TodosService } from "@shared/api/todos.service.ts";
import { Button, Input } from "@shared/ui";

type NewListInputs = {
	title: string;
};

export const Home = () => {
	const [isCreateNewListModalOpen, setIsCreateNewListModalOpen] =
		useState(false);
	const [isUpdate, setIsUpdate] = useState(false);

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
		TodosService.createTodoList(title);
		setTodoLists(prevState => [...prevState]);
		setIsUpdate(!isUpdate);
		handleCloseModal();
	};

	const handleDeleteList = (id: string) => {
		TodosService.deleteTodoList(id);
		setIsUpdate(!isUpdate);
	};

	const onSubmit = (data: NewListInputs) => {
		setIsUpdate(!isUpdate);
		handleCreateList(data.title);
	};

	useEffect(() => {
		const fetchTodoLists = async () => {
			try {
				const lists = await TodosService.getAllTodoLists();
				setTodoLists(lists);
			} catch (err) {
				console.error("Error fetching todo lists:", err);
			}
		};
		fetchTodoLists();
	}, [isUpdate]);

	return (
		<div
			className={
				"flex flex-col justify-center gap-4 font-medium max-w-[600px] mx-auto"
			}>
			<h1 className={"flex justify-center text-3xl"}>List of all todo lists</h1>
			<ul
				className={
					"flex flex-row justify-start flex-wrap mx-auto w-full max-w-[600px] bg-white h-full rounded-2xl p-4 gap-2"
				}>
				{todoLists.map((list, id) => (
					<div
						key={Number(list.id) | id}
						className={
							"flex flex-row gap-2 bg-amber-100 w-max p-3 rounded-2xl hover:bg-amber-200"
						}>
						<Link to={`/list/${list.id}`}>{list.title}</Link>
						<button
							className={"text-red-500"}
							onClick={() => handleDeleteList(list.id)}>
							X
						</button>
					</div>
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
