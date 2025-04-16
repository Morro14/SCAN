import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    actualData: false,
    limit: 0,
    count: 0,
  },
  reducers: {
    setUserInfo: (state, actions) => {
      state.count = actions.payload.count;
      state.limit = actions.payload.limit;
      state.actualData = true;
    },
  },
});
export const { setUserInfo } = userInfoSlice.actions;
export interface UserInfo {
  actualData: boolean;
  limit: number;
  count: number;
}
export default userInfoSlice.reducer;
