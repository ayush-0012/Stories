import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titleValue: "",
  storyValue: "",
  userName: "",
};

export const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.titleValue = action.payload;
    },

    setStory: (state, action) => {
      state.storyValue = action.payload;
    },

    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setTitle, setStory, setUserName } = createPostSlice.actions;

export default createPostSlice.reducer;
