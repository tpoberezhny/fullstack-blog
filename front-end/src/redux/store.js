import { configureStore } from "@reduxjs/toolkit";

import { postsRecuder } from "./slices/posts";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    posts: postsRecuder,
    auth: authReducer,
  },
});

export default store;
