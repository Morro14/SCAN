import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import setValid from "./validateSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		validate: setValid,
	},
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
