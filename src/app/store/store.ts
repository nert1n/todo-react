import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth-slice.tsx";
import todoListsReducer from "./slices/todo-lists-slice.tsx";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		todoLists: todoListsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
