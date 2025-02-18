import { appApi } from "@/containers/App/api";
import { appSlice } from "@/containers/App/slice";
import { authApi } from "@/containers/Auth/api";
import { authSlice } from "@/containers/Auth/slice";
import { storagesApi } from "@/containers/Storages/api";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [appSlice.reducerPath]: appSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
  [storagesApi.reducerPath]: storagesApi.reducer,
});

export default reducer;
