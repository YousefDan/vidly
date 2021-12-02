import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./loginSlice";
import { movieSlice } from "./movieSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    login: loginSlice.reducer,
  },
});

export default store;
