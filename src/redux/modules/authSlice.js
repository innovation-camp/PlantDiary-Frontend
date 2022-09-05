import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const SignUp = createAsyncThunk("LOGIN", async (JoinInfo) => {
  //   const res = await axios.get(`${process.env.REACT_APP_URL}/login`);

  // const res = await axios.post(`localhost:3001/login`, JoinInfo);
  // const { accessToken } = res.data;
  // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
  // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  // axios.post('/auth/login', variables)
  //   .then(res => {
  //     setCookie('token', res.payload.accessToken)
  //     setCookie('exp', res.payload.accessTokenExpiresIn)
  //     // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
  //     Axios.defaults.headers.common['Authorization'] = `Bearer ${res.payload.accessToken}`
  //     Axios.get('/user/me')
  //       .then(res => {
  //         console.log(res);
  //       })
  //   })

  // return res.status;  ???
  return console.log("SignUp > ", JoinInfo);
});

// 로그인
// 이메일 중복 확인 api
// 닉네임 중복 확인 api

const authSlice = createSlice({
  name: "login",
  initialState: {
    posts: [],
  },
  reducers: {},
});

export default authSlice.reducer;
