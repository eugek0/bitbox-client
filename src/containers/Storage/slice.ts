import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStorageBuffer, IStorageSliceState } from "./types";

const initialState: IStorageSliceState = {
  buffer: {
    items: [],
    type: null,
  },
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setStorageBuffer: (state, action: PayloadAction<IStorageBuffer>) => {
      state.buffer = action.payload;
    },

    clearStorageBuffer: (state) => {
      state.buffer = initialState.buffer;
    },
  },
});

export const { setStorageBuffer, clearStorageBuffer } = storageSlice.actions;
