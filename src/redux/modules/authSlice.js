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
  const res = await instance.get(`/user`);
  return res.data;
});

export const changeUserInfo = createAsyncThunk(
  "CHANGE_USERINFO",
  async (userInfo) => {
    const res = await instance.put(`/api/auth/mypage`, userInfo);
    return res.data;
  }
);

// 마이페이지 조회 및 수정 api 가 동일
// 보내주는 데이터가 있다면, 수정해주고 없다면
// 그냥 토큰에 맞는 유저 정보를 주는거?

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
    builder.addCase(mypage.fulfilled, (state, action) => {
      state.user = [...action.payload];
    });
  },
});

export default authSlice.reducer;
