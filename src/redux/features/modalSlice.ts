import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = {
  isOpen: boolean,
  user: ResultsEntity | null
}

const initialState: ModalState = {
  isOpen: false,
  user: null
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = initialState.isOpen;
      // state.user = initialState.user;
    },
    openModal: (state, action: PayloadAction<ResultsEntity>) => {
      state.isOpen = true;
      state.user = action.payload;
    }
  }
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
