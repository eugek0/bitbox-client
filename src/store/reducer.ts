import { appApi } from "@/containers/App/api";
import { appSlice } from "@/containers/App/slice";
import { authApi } from "@/containers/Auth/api";
import { authSlice } from "@/containers/Auth/slice";
import { storageApi } from "@/containers/Storage/api";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [appSlice.reducerPath]: appSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [storageApi.reducerPath]: storageApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
});

export default reducer;
