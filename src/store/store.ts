import { authApi } from "@/containers/Auth/api";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { storagesApi } from "@/containers/Storages/api";
import { usersApi } from "@/core/api";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      storagesApi.middleware,
      usersApi.middleware,
    ]),
});
