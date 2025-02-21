import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "./types";

const initialState: IRootState = {
  notification: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});
