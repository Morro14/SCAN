import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import setSearchRes from "./searchResultsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    searchRes: setSearchRes,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
