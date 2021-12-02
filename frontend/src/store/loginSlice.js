import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    error: null,
  },
  reducers: {
    getUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    getError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    userLogout(state){
      state.userInfo = null;
    }
  },
});

const loginActions = loginSlice.actions;
export { loginSlice, loginActions };
