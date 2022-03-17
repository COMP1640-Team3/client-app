import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authSlice";
import { ideasReducer } from "./reducers/ideasSlice";
import { profileReducer } from "./reducers/profileSlice";

export const store = configureStore({
    reducer: {
        authReducer,
        ideasReducer,
        profileReducer,
    },
});
