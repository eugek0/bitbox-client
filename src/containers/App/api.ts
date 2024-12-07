import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IAppStatus } from "./types";

export const appApi = createApi({
  baseQuery: fetchMainBaseQuery(""),
  reducerPath: "app/api",
  endpoints: (builder) => ({
    getAppStatus: builder.query<IAppStatus, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetAppStatusQuery } = appApi;
