import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IStoragesTableRecord } from "../Storages/StoragesTableContainer/types";

export const storageApi = createApi({
  reducerPath: "storage/api",
  baseQuery: fetchMainBaseQuery("/storages"),
  endpoints: (builder) => ({
    getStorage: builder.query<IStoragesTableRecord, string>({
      query: (id: string) => ({
        url: `/${id}`,
      }),
      keepUnusedDataFor: 0,
    }),

    getStorageEntities: builder.query({
      query: ({ id, params }) => ({
        url: `/${id}/entities`,
        params,
      }),
    }),
  }),
});

export const { useGetStorageQuery, useGetStorageEntitiesQuery } = storageApi;
