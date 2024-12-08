import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppState, IAppStatus } from "./types";
import { appApi } from "./api";

const initialState: IAppState = {
  appStatus: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<IAppStatus>) => {
      state.appStatus = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.getAppStatus.matchFulfilled,
      (state, action) => {
        state.appStatus = action.payload;
      },
    );
  },
});
