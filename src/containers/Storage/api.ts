import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const storageApi = createApi({
  reducerPath: "storage/api",
  baseQuery: fetchMainBaseQuery("/storage"),
  endpoints: (builder) => ({
    getStorageInfo: builder.query<unknown, string>({
      query: (userId) => `/info/${userId}`,
    }),
  }),
});

export const { useGetStorageInfoQuery } = storageApi;
