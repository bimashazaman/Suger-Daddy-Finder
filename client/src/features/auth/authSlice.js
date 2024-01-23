import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

// Async thunk for updating user data
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, updates }, { getState }) => {
    const state = getState();
    const response = await axios.put(
      `${BASE_URL}/user/update/${userId}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    return response.data;
  }
);

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
