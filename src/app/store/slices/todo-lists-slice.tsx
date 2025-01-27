import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoListElement {
	id?: string;
	listId?: string;
	title: string;
	description: string;
	createdBy?: string;
	editedBy?: string;
	completed?: boolean;
}

interface TodoListState {
	list: TodoListElement[];
	loading: boolean;
	isUpdated: boolean;
}

const initialState: TodoListState = {
	list: [],
	loading: false,
	isUpdated: false,
};

const todoListSlice = createSlice({
	name: "todoList",
	initialState,
	reducers: {
		setList(state, action: PayloadAction<TodoListElement[]>) {
			state.list = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		updateTodo(state, action: PayloadAction<TodoListElement>) {
			const index = state.list.findIndex(todo => todo.id === action.payload.id);
			if (index !== -1) {
				state.list[index] = { ...state.list[index], ...action.payload };
			}
		},
		addTodo(state, action: PayloadAction<TodoListElement>) {
			state.list.push(action.payload);
		},
		deleteTodo(state, action: PayloadAction<string>) {
			state.list = state.list.filter(todo => todo.id !== action.payload);
		},
		setIsUpdated(state) {
			state.isUpdated = !state.isUpdated;
		},
	},
});

export const {
	addTodo,
	deleteTodo,
	setIsUpdated,
	setList,
	setLoading,
	updateTodo,
} = todoListSlice.actions;

export default todoListSlice.reducer;
