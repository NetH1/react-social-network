import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./userSlice";
import PostsSlice from "./postsSlice";
import getPostSlice from "./getPostSlice";
import friendsSlice from "./friendsSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    posts: PostsSlice.reducer,
    post: getPostSlice.reducer,
    friends: friendsSlice.reducer,
  },
});
