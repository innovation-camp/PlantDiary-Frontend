import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk("GET_POST", async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_URL}/posts`);
  const res = await axios.get(`localhost:3001/posts`);
  return res.data;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {},
});

export default postSlice.reducer;
