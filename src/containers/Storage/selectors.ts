import { createSelector } from "@reduxjs/toolkit";
import { selectSelf } from "@/store";

export const storageBaseSelector = createSelector(
  selectSelf,
  (state) => state.storage,
);

export const storageBufferSelector = createSelector(
  storageBaseSelector,
  (state) => state.buffer,
);
