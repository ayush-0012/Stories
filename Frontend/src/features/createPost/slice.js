import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titleValue: "",
  storyValue: "",
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
  },
});

export const { setTitle, setStory } = createPostSlice.actions;

export default createPostSlice.reducer;
