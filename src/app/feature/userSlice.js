import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
    },
    isAuthReady: (state) => {
      state.authReady = true;
    },
  },
});

export const { login, logout, isAuthReady } = userSlice.actions;
export default userSlice.reducer;
