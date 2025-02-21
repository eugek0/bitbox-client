import { selectSelf } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const rootBaseSelector = createSelector(
  selectSelf,
  (state) => state.root,
);

export const notificationSelector = createSelector(
  rootBaseSelector,
  (state) => state.notification,
);
