import { authApi } from "@/containers/Auth/api";
import { authSlice } from "@/containers/Auth/slice";
import { storageApi } from "@/containers/Storage/api";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [storageApi.reducerPath]: storageApi.reducer,
});

export default reducer;
