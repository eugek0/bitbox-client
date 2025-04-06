import { combineReducers } from "@reduxjs/toolkit";
import { rootSlice } from "@/containers/Root/slice";
import { authApi } from "@/containers/Auth/api";
import { authSlice } from "@/containers/Auth/slice";
import { storagesApi } from "@/containers/Storages/api";
import { usersApi } from "@/core/api";
import { storageApi } from "@/containers/Storage/api";
import { storageSlice } from "@/containers/Storage/slice";

const reducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [rootSlice.reducerPath]: rootSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [storagesApi.reducerPath]: storagesApi.reducer,
  [storageApi.reducerPath]: storageApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [storageSlice.reducerPath]: storageSlice.reducer,
});

export default reducer;
