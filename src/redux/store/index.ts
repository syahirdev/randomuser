import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../features/modalSlice";
import friendSlice from "../features/friendSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    user: userSlice,
    friend: friendSlice
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
