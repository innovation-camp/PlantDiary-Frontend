import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../network/request";

export const signUp = createAsyncThunk("SIGNUP", async (JoinInfo) => {
  const res = await instance.post(`/api/auth/register`, JoinInfo);
  console.log("res signup > ", res.data);
  return res.data;
});

export const logIn = createAsyncThunk("LOGIN", async (loginInfo) => {
  const res = await instance.post(`/api/auth/login`, loginInfo);
  console.log("res logIn > ", res.data);
  return res.data;
});

// TODO: 마이페이지 요청시 토큰에 해당하는 user 데이터를 응답 받음.
// 현재는 받는 데이터가 없어서 리듀서에서 넣..?
// 근데 로그인 된 상태면..이미 user 에 들어가 있을테니까, 새로 api 요청을 안해도
// store 에서 가져올 수 있지 않나..? 저장해놨다면?
export const mypage = createAsyncThunk("MYPAGE", async () => {
  // const res = await instance.get(`/api/auth/mypage`);
  const res = await instance.get(`/user`); // 임시 🐥
  return res.data;
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

// TODO: post 전체조회. 나중에 postSlice 로 이동
export const getPosts = createAsyncThunk("GET_POSTS", async () => {
  // const res = await instance.get(`/api/posts`);
  const res = await instance.get(`/posts`); // 임시 🐥
  console.log("res posts > ", res.data[0]);
  return res.data[0];
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = [...action.payload];
    });
    builder.addCase(mypage.fulfilled, (state, action) => {
      state.user = [...action.payload];
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = [...action.payload.data];
    });
  },
});

export default authSlice.reducer;
