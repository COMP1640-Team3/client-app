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

export const getUserRole = createAsyncThunk("auths/roleFetched", async () => {
  const res = await Api().get('/auth/users')
  localStorage.setItem('role', JSON.stringify(res.data.name))
  return res.data;
})

const AuthSlice = createSlice({
  name: "authentications",
  initialState: {
    userInfo: {
      email: "",
    },
    roleName: '',
  },
  reducers: {
    updateUserInto(state, action) {
      state.userInfo.email = action.payload;
    },
    deleteAuth(state, action) {
      state.userInfo = {}
      state.roleName = ''
    }
  },

  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo.email = action.payload.email;
    },
    [getUserInfo.rejected]: (state, action) => {
      alert("Error to get user info");
    },
    [getUserRole.fulfilled]: (state, action) => {
      state.roleName = action.payload.name
    },
    [getUserRole.rejected]: (state, action) => {
      alert("Error to get user role")
    }
  },
});

// selector
export const userInfoSelector = (state) => state.authReducer.userInfo;
export const roleNameSelector = (state) => state.authReducer.roleName;
// Reducer
export const authReducer = AuthSlice.reducer;

// Action export
export const { updateUserInto, deleteAuth } = AuthSlice.actions;
