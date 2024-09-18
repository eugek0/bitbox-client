import { selectSelf } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const authBaseSelector = createSelector(
  selectSelf,
  (state) => state.auth,
);

export const profileSelector = createSelector(
  authBaseSelector,
  (state) => state.profile,
);
