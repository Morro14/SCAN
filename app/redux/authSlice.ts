import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface InitialState {
	username: null | string;
	token: null | string;
	expire: null | string;
	redirect: null | string;
	auth: "true" | "false" | "pending";
}
const initialState: InitialState = {
	username: null,
	token: null,
	expire: null,
	redirect: null,
	auth: "pending",
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		authReducer: (state, action) => {
			state.token = action.payload.token;
			state.username = action.payload.username;
			state.expire = action.payload.expire;
			state.redirect = action.payload.redirect;
			state.auth = action.payload.auth;
		},
	},
});
export const selectUsername = (state: RootState) => state.auth.username;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuth = (state: RootState) => state.auth.auth;
export const selectRedirect = (state: RootState) => state.auth.redirect;
export const { authReducer } = authSlice.actions;

export default authSlice.reducer;
