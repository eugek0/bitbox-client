import { authApi } from "@/containers/Auth/api";
import { authSlice } from "@/containers/Auth/slice";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default reducer;
