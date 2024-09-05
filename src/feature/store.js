import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slice/loginSlice.jsx";
import ActiveSingleSlice from "./slice/ActiveSingleSlice.jsx";

const store = configureStore({
  reducer: {
    login: loginSlice,
    active: ActiveSingleSlice,
  },
});

export default store;
