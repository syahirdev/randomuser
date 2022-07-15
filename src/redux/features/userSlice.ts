import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type FriendState = {
  loading: boolean,
  error: boolean,
  user: ResultsEntity[] | [],
}

const initialState: FriendState = {
  loading: false,
  error: false,
  user: []
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async() => {
    const response = await axios.get("https://randomuser.me/api/?seed=lll");
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.loading = false;
      state.error = false;
      state.user = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      const { results } = action.payload;
      state.loading = false;
      state.error = false;
      state.user = results;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.user = [];
    });
  }
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
