import { configureStore } from "@reduxjs/toolkit";
import createPostReducer from "../features/createPost/slice";

export const store = configureStore({
  reducer: {
    createPost: createPostReducer,
  },
});
