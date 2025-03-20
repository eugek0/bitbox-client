import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const storageApi = createApi({
  reducerPath: "storage/api",
  baseQuery: fetchMainBaseQuery("/storages"),
  endpoints: (builder) => ({
    getStorage: builder.query({
      query: (id: string) => ({
        url: `/${id}`,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetStorageQuery } = storageApi;
