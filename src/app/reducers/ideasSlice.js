import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const getDetailIdea = createAsyncThunk(
  "idea/ideaFetched",
  async (ideaId) => {
    try {
      const idea = await Api().get(`/ideas/${ideaId}`);
      const totalLike = await Api().get(`/ideas/${ideaId}/likes`);
      //   console.log(response.data);
      return {
        idea: idea.data,
        totalLikeIdea: totalLike.data,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

const IdeaSlice = createSlice({
  name: "ideas",
  initialState: {
    idea: {},
    totalLike: "",
  },

  reducers: {
    // updateIdeaState(state, action) {
    //   state.idea = action.payload;
    // },
  },

  extraReducers: {
    [getDetailIdea.fulfilled]: (state, action) => {
      //   console.log(action.payload);
      state.idea = action.payload.idea;
      state.totalLike = action.payload.totalLikeIdea;
    },
  },
});

// selector
export const ideaSelector = (state) => state.ideasReducer.idea;
export const totalLikeOfIdeaSelector = (state) => state.ideasReducer.totalLike;
// Reducer
export const ideasReducer = IdeaSlice.reducer;

// Action export
