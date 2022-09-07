import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../network/request";

export const getPosts = createAsyncThunk("GET_POSTS", async () => {
  const res = await instance.get(`/api/posts`);
  // const res = await instance.get(`/posts`); // 임시 🐥
  console.log("res posts > ", res.data[0]);
  return res.data[0];
});

export const getPost = createAsyncThunk("GET_POST", async (id) => {
  const res = await instance.get(`/api/posts/${id}`);
  // const res = await instance.get(`/post`); // 임시 🐥
  console.log("res post > ", res.data);
  return res.data;
});

export const addPost = createAsyncThunk("ADD_POST", async (post) => {
  const res = await instance.post(`/api/posts`, post);
  // const res = await instance.post(`/post`); // 임시 🐥
  console.log("res post > ", post);
  //   return res.data;
  return;
});

export const updatePost = createAsyncThunk("UPDATE_POST", async (post) => {
  const { id, title, content, thumbnail } = post;
  const res = await instance.put(`/api/posts/${id}`, {
    title,
    content,
    thumbnail,
  });
  // const res = await instance.put(`/post`); // 임시 🐥
  console.log("res update > ", res.data);
  //   return res.data;
  return;
});

export const deletePost = createAsyncThunk("DELETE_POST", async (id) => {
  const res = await instance.get(`/api/posts/${id}`);
  // const res = await instance.get(`/posts`); // 임시 🐥
  console.log("res posts > ", res.data[0]);
  return res.data[0];
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = [...action.payload.data];
    });
  },
});

export default postSlice.reducer;
