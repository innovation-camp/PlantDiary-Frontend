import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance, imageClient } from "../../network/request";

export const getPosts = createAsyncThunk("GET_POSTS", async () => {
  const res = await instance.get(`/api/posts`);
  return res.data;
});

export const getPost = createAsyncThunk("GET_POST", async (id) => {
  const res = await instance.get(`/api/posts/${id}`);
  console.log("res getPost > ", res.data);
  return res.data;
});

export const addPost = createAsyncThunk("ADD_POST", async (post) => {
  const res = await instance.post(`/api/posts`, post);
  console.log("res ? ", post);
  return res.data;
});

export const uploadThumbnail = createAsyncThunk(
  "UPLOAD_THUMBNAIL",
  async (thumbnail) => {
    const res = await imageClient.post(`/api/posts/upload`, thumbnail);
    console.log("res uploadThumbnail ? ", res.data);
    return res.data;
  }
);

export const updatePost = createAsyncThunk("UPDATE_POST", async (post) => {
  const { id, title, content, thumbnail } = post;
  const res = await instance.put(`/api/posts/${id}`, {
    title,
    content,
    thumbnail,
  });
  console.log("res update > ", res.data);
  return res.data;
});

export const deletePost = createAsyncThunk("DELETE_POST", async (id) => {
  const res = await instance.delete(`/api/posts/${id}`);
  return res.data;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = [...action.payload];
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
  },
});

export default postSlice.reducer;
