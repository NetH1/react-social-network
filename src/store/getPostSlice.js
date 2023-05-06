import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = process.env.REACT_APP_ENDPOINT || "";

export const getPost = createAsyncThunk(
  "post/getPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${endpoint}/posts/${postId}`
      );

      if (!response.ok) {
        throw new Error("Server error!");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getPostSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.post = action.payload;
    },
  },
});

export default getPostSlice;
