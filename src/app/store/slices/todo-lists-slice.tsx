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
}

const initialState: TodoListState = {
	list: [],
	loading: false,
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
	},
});

export const { addTodo, setList, setLoading, updateTodo } =
	todoListSlice.actions;

export default todoListSlice.reducer;
