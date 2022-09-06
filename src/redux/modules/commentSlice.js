import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../network/request";

// export const getComments = createAsyncThunk("GET_COMMENTS", async (id) => {
//   const res = await instance.get(`/api/posts/${id}/comments`);
export const getComments = createAsyncThunk("GET_COMMENTS", async () => {
  const res = await instance.get(`/comments`); // 임시 🐥 위에 주석 두 줄로 바꿔야 함!
  return res.data;
});

export const postComment = createAsyncThunk(
  "POST_COMMENTS",
  async (content) => {
    // const res = await instance.post(`/api/comment`, content);
    const res = await instance.post(`/comments`, content); // 임시 🐥
    return res.data;
  }
);

export const deleteComment = createAsyncThunk("DELETE_COMMENTS", async (id) => {
  // const res = await instance.delete(`/api/comment/${id}`);
  const res = await instance.delete(`/comments/${id}`); // 임시 🐥
  return res.data;
});

export const updateComment = createAsyncThunk(
  "UPDATE_COMMENTS",
  async (editComment) => {
    // const res = await instance.put(`/api/comment/${editComment.id}`, editComment.content);
    const res = await instance.patch(`/comments/${editComment.id}`, {
      content: editComment.content,
    }); // 임시 🐥
    return res.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comment = [...action.payload];
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comment.push(action.payload);
    });
  },
});

export default commentSlice.reducer;
