import { createApi } from "@reduxjs/toolkit/query/react";
import fetchMainBaseQuery from "@/core/rtkquery";
import { ILog, IMethod } from "./types";

export const logsApi = createApi({
  reducerPath: "logs/api",
  baseQuery: fetchMainBaseQuery("/logger"),
  endpoints: (builder) => ({
    getLogs: builder.query<ILog[], void>({
      query: () => ({
        url: "/",
      }),
      keepUnusedDataFor: 0,
    }),

    getMethods: builder.query<IMethod[], void>({
      query: () => ({
        url: "/methods",
      }),
    }),
  }),
});

export const { useGetLogsQuery, useGetMethodsQuery } = logsApi;
