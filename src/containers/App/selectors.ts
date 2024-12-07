import { selectSelf } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const appBaseSelector = createSelector(selectSelf, (state) => state.app);

export const appStateSelector = createSelector(
  appBaseSelector,
  (state) => state.appStatus,
);

export const appStatusSelector = createSelector(
  appStateSelector,
  (state) => state,
);
