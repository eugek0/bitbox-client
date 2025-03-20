import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/containers/Auth/api";
import { usersApi } from "@/core/api";
import { storagesApi } from "@/containers/Storages/api";
import { storageApi } from "@/containers/Storage/api";
import reducer from "./reducer";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      storagesApi.middleware,
      storageApi.middleware,
      usersApi.middleware,
    ]),
});
