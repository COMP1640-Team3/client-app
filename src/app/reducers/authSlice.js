import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";

// Reducer Thunk
export const getUserInfo = createAsyncThunk("auths/infoFetched", async () => {
  try {
    const response = await Api().get("/user");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const AuthSlice = createSlice({
  name: "authentications",
  initialState: {
    userInfo: {
      email: "",
    },
  },
  reducers: {},

  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo.email = action.payload.email;
    },
    [getUserInfo.rejected]: (state, action) => {
      alert("Error to get user info");
    },
  },
});

// selector
export const userInfoSelector = (state) => state.authReducer.userInfo;
// Reducer
export const authReducer = AuthSlice.reducer;

// Action export
// export const { updateAuth, logout } = AuthSlice.actions;
