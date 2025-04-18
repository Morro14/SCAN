import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    token: null,
    expire: null,
  },
  reducers: {
    authReducer: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.expire = action.payload.expire;
    },
  },
});
export const selectToken = (state: RootState) => state.auth.token;
export const { authReducer } = authSlice.actions;

export default authSlice.reducer;
