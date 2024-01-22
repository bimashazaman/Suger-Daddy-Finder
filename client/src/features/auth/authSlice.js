// src/features/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
