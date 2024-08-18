import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "login",
  initialState: {
    loggedIn: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    loggedInUser: (state, action) => {
      state.loggedIn = action.payload;
    },
    loggedOutUser: (state) => {
      state.loggedIn = null;
    },
  },
});

export const { loggedInUser, loggedOutUser } = userSlice.actions;

export default userSlice.reducer;
