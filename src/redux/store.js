import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./modules/authSlice";
import commentSlice from "./modules/commentSlice";
import postSlice from "./modules/postSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    comment: commentSlice,
    post: postSlice,
  },
});

export default store;
