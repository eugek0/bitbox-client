import { authApi } from "@/containers/Auth/api";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { appApi } from "@/containers/App/api";
import { storagesApi } from "@/containers/Storages/api";
import { usersApi } from "@/core/api";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      appApi.middleware,
      storagesApi.middleware,
      usersApi.middleware,
    ]),
});
