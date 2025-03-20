import { combineReducers } from "@reduxjs/toolkit";
import { rootSlice } from "@/containers/Root/slice";
import { authApi } from "@/containers/Auth/api";
import { authSlice } from "@/containers/Auth/slice";
import { storagesApi } from "@/containers/Storages/api";
import { usersApi } from "@/core/api";
import { storageApi } from "@/containers/Storage/api";

const reducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [rootSlice.reducerPath]: rootSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [storagesApi.reducerPath]: storagesApi.reducer,
  [storageApi.reducerPath]: storageApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

export default reducer;
