// all the mini reducers for managing state(user) will be inside here, redux toolkit will convert all these mini reducers with different functions into one big reducer and attach that with our user state
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  podcasts: [],
};

const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
  },
});

export const { setPodcasts } = podcastSlice.actions;
export default podcastSlice.reducer;
