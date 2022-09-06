import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./modules/authSlice";
import commentSlice from "./modules/commentSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    comment: commentSlice,
  },
});

export default store;
