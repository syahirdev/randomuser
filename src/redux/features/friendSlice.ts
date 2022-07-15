import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type FriendState = {
  loading: boolean,
  error: boolean,
  data: ResultsEntity[] | [],
}

const initialState: FriendState = {
  loading: false,
  error: false,
  data: [],
};

export const getFriendlist = createAsyncThunk(
  "friend/getFriendlist",
  async({ page, resultPerPage }: { page: number, resultPerPage: number }) => {
    const response = await axios.get(`https://randomuser.me/api/?seed=lll&page=${page}&results=${resultPerPage}`);
    return response.data;
  }
);

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    clearFriendsData: (state) => {
      state.loading = false;
      state.error = false;
      state.data = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFriendlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFriendlist.fulfilled, (state, action) => {
      const { results } = action.payload;
      state.loading = false;
      state.error = false;
      state.data = results;
    });
    builder.addCase(getFriendlist.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    });
  }
});

export const { clearFriendsData } = friendSlice.actions;
export default friendSlice.reducer;
