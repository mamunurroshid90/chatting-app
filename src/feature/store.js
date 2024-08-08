import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slice/loginSlice.jsx";

const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export default store;
