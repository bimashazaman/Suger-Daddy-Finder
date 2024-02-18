// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

//get the token from local storage
const token = localStorage.getItem("token");

export const fetchSugarBabies = createAsyncThunk(
  "users/fetchSugarBabies",
  async () => {
    const response = await axios.get(`${BASE_URL}/user/sugarbaby`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    sugarBabies: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSugarBabies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSugarBabies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sugarBabies = action.payload;
      })
      .addCase(fetchSugarBabies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
