import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IStoragesTableRecord } from "./StoragesTableContainer/types";
import { ICreateStoragePayload, ISearchStoragesOptionsPayload } from "./types";
import { DefaultOptionType } from "antd/es/select";

export const storagesApi = createApi({
  reducerPath: "storages/api",
  baseQuery: fetchMainBaseQuery("/storages"),
  endpoints: (builder) => ({
    getStorages: builder.query<IStoragesTableRecord[], void>({
      query: () => ({
        url: "/",
      }),
    }),

    createStorage: builder.mutation<void, ICreateStoragePayload>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),

    deleteStorage: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),

    searchStoragesOptions: builder.query<
      DefaultOptionType[],
      ISearchStoragesOptionsPayload
    >({
      query: (params) => ({
        url: "/search/options",
        params,
      }),
    }),
  }),
});

export const {
  useGetStoragesQuery,
  useCreateStorageMutation,
  useDeleteStorageMutation,
  useLazySearchStoragesOptionsQuery,
} = storagesApi;
