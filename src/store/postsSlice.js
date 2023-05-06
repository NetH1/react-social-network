import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = process.env.REACT_APP_ENDPOINT || "";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${endpoint}/posts?_page=${page}&_limit=${limit}&_expand=user`
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

export const createPost = createAsyncThunk(
  'posts/createPost',
  async( {form,userId}, {rejectWithValue} ) => {
    try {
      const res = await fetch(
        `${endpoint}/posts`,
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...form,userId})
        }
      )
      if(!res.ok) {
        throw new Error('error')
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    },
    
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    },
  },
});

export default PostsSlice;
