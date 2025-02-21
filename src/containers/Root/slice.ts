import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "./types";

const initialState: IRootState = {
  notification: null,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});
