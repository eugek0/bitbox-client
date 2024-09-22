import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "./types";
import { authApi } from "./api";

const initialState: IAuthState = {
  profile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getProfile.matchFulfilled,
      (state, action) => {
        state.profile = action.payload;
      },
    );

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.profile = null;
      authApi.util.resetApiState();
    });
  },
});
