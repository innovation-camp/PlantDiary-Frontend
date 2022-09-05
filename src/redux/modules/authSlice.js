import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../network/request";

export const signUp = createAsyncThunk("SIGNUP", async (JoinInfo) => {
  const res = await instance.post(`/api/auth/register`, JoinInfo);
  console.log("res signup > ", res.data);
  return console.log("SignUp > ", JoinInfo);
});

export const logIn = createAsyncThunk("LOGIN", async (loginInfo) => {
  const res = await instance.post(`/api/auth/login`, loginInfo);
  console.log("res login > ", res.data);
  return console.log("SignUp > ", loginInfo);
});

export const emailConfirm = createAsyncThunk("CONFIRM_EMAIL", async (email) => {
  const res = await instance.get(`/api/auth/email`, email);
  console.log("res email > ", res.data);
  return true;
});

export const nicknameConfirm = createAsyncThunk(
  "CONFIRM_NiCKNAME",
  async (nickname) => {
    const res = await instance.get(`/api/auth/nickname`, nickname);
    console.log("res email > ", res.data);
    return console.log("nickname? > ", nickname);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = [...action.payload];
    });
  },
});

export default authSlice.reducer;
