import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const getProfileDetail = createAsyncThunk('profiles/fetched', async () => {
    try {
        const res = await Api().get('/auth/users/profiles')
        // console.log('profile', res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }

})
const ProfileSlice = createSlice({
    name: 'profiles',
    initialState: {
        profile: {}
    },
    reducers: {},

    extraReducers: {
        [getProfileDetail.fulfilled](state, action) {
            state.profile = action.payload
        },
    }
})


// Selector
export const profileSelector = (state) => state.profileReducer.profile

// Reducer
export const profileReducer = ProfileSlice.reducer;

// Action