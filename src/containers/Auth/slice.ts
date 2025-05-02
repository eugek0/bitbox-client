import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "./types";
import { authApi } from "./api";

const initialState: IAuthState = {
  profile: null,
  isProfileLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.getProfile.matchPending, (state) => {
      state.isProfileLoading = true;
    });

    builder.addMatcher(
      authApi.endpoints.getProfile.matchFulfilled,
      (state, action) => {
        state.profile = action.payload;
        state.isProfileLoading = false;
      },
    );

    builder.addMatcher(authApi.endpoints.getProfile.matchRejected, (state) => {
      state.isProfileLoading = false;
    });

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.profile = null;
      location.reload();
    });
  },
});
