import { configureStore } from "@reduxjs/toolkit";

import { postsRecuder } from "./slices/posts";

const store = configureStore({
  reducer: {
    posts: postsRecuder
  },
});

export default store;
