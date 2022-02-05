import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "authentications",
  initialState: {
    userInfo: {},
  },
  reducers: {
    // updateAuth(state, action) {
    //   state.email = action.payload;
    //   state.isAuthenticated = true;
    // },
    // // User Logout
    // logout(state, action) {
    //   state.email = "";
    //   state.isAuthenticated = false;
    // },
  },
});

// selector
// export const isAuthenticatedSelector = (state) =>
//   state.authReducer.isAuthenticated;
// Reducer
export const authReducer = AuthSlice.reducer;

// Action export
export const { updateAuth, logout } = AuthSlice.actions;
