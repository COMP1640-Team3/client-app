import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import {authReducer} from "./reducers/authSlice";
import {ideasReducer} from "./reducers/ideasSlice";
import {profileReducer} from "./reducers/profileSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        authReducer,
        ideasReducer,
        profileReducer,
    },
});
