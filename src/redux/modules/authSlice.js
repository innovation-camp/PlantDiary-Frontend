import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../network/request";
import setAuthorizationToken from "../../util/setAuthorizationToken";

export const signUp = createAsyncThunk("SIGNUP", async (JoinInfo) => {
  const res = await instance.post(`/api/auth/register`, JoinInfo);
  return res.data;
});

export const logIn = createAsyncThunk("LOGIN", async (loginInfo) => {
  const res = await instance.post(`/api/auth/login`, loginInfo);
  console.log("res logIn > ", res);
  const accessToken = res.headers.get("Authorization");
  // const refreshToken = res.headers.get("refreshToken");
  console.log("accessToken :>> ", accessToken);
  // console.log("refreshToken :>> ", refreshToken);
  // localStorage.setItem("Authorization", `Bearer ${accessToken}`);
  // localStorage.setItem("refreshToken", `${refreshToken}`);
  return res.data;
});

export const logOut = createAsyncThunk("LOGOUT", async () => {
  return;
});

export const mypage = createAsyncThunk("MYPAGE", async () => {
  const res = await instance.get(`/api/auth/mypage`);
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
  const res = await instance.post(`/api/auth/email`, { email });
  console.log("res email > ", res.data);
  return res.data;
});

export const nicknameConfirm = createAsyncThunk(
  "CONFIRM_NiCKNAME",
  async (nickname) => {
    const res = await instance.post(`/api/auth/nickname`, { nickname });
    console.log("res email > ", res.data);
    return res.data;
  }
);

// TODO: user default 값 수정해야 함. 일단 로그인 된 상태로 테스트하기 위해 값 넣어둠
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { isAuthenticated: false, nickname: "" },
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.user.isAuthenticated = action.payload.success;
        state.user.nickname = action.payload.data.nickname;
      } else {
        return;
      }
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.user.isAuthenticated = false;
      state.user.nickname = "";
    });
  },
});

export default authSlice.reducer;
