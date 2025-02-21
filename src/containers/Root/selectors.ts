import { selectSelf } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const appBaseSelector = createSelector(selectSelf, (state) => state.app);

export const notificationSelector = createSelector(
  appBaseSelector,
  (state) => state.notification,
);
