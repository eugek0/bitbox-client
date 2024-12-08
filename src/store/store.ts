import { authApi } from "@/containers/Auth/api";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { storageApi } from "@/containers/Storage/api";
import { appApi } from "@/containers/App/api";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      storageApi.middleware,
      appApi.middleware,
    ]),
});
