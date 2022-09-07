import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../network/request";

export const signUp = createAsyncThunk("SIGNUP", async (JoinInfo) => {
  const res = await instance.post(`/api/auth/register`, JoinInfo);
  console.log("res signup > ", res.data);
  return res.data;
});

export const logIn = createAsyncThunk("LOGIN", async (loginInfo) => {
  const res = await instance.post(`/api/auth/login`, loginInfo);
  // export const logIn = createAsyncThunk("LOGIN", async () => {
  //   const res = await instance.get(`/user`); // 임시 🐥
  console.log("res logIn > ", res.data);
  return res.data;
});

export const logOut = createAsyncThunk("LOGOUT", async () => {
  return;
});

export const mypage = createAsyncThunk("MYPAGE", async () => {
  // const res = await instance.get(`/api/auth/mypage`);
  const res = await instance.get(`/user`); // 임시 🐥
  console.log("mypage > ", res.data);
  return res.data.success === true ? res.data.data : false;
});

export const changeUserInfo = createAsyncThunk(
  "CHANGE_USERINFO",
  async (userInfo) => {
    const res = await instance.put(`/api/auth/mypage`, userInfo);
    return res.data;
  }
);

export const emailConfirm = createAsyncThunk("CONFIRM_EMAIL", async (email) => {
  const res = await instance.get(`/api/auth/email`, email);
  console.log("res email > ", res.data);
  return res.data;
});

export const nicknameConfirm = createAsyncThunk(
  "CONFIRM_NiCKNAME",
  async (nickname) => {
    const res = await instance.get(`/api/auth/nickname`, nickname);
    console.log("res email > ", res.data);
    return res.data;
  }
);

// TODO: user default 값 수정해야 함. 일단 로그인 된 상태로 테스트하기 위해 값 넣어둠
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { isAuthenticated: true, nickname: "moon5" },
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user.isAuthenticated = action.payload[0].success;
      state.user.nickname = action.payload[0].data.nickname;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.user.isAuthenticated = false;
      state.user.nickname = "";
    });
  },
});

export default authSlice.reducer;
