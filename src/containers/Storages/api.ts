import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IStoragesTableRecord } from "./StoragesTableContainer/types";
import {
  TCreateStoragePayload,
  IEditStoragePayload,
  ISearchStoragesOptionsPayload,
  IDeleteStoragesPayload,
} from "./types";
import { DefaultOptionType } from "antd/es/select";

export const storagesApi = createApi({
  reducerPath: "storages/api",
  baseQuery: fetchMainBaseQuery("/storages"),
  endpoints: (builder) => ({
    getStorages: builder.query<IStoragesTableRecord[], void>({
      query: () => ({
        url: "/",
      }),
      keepUnusedDataFor: 0,
    }),

    createStorage: builder.mutation<void, TCreateStoragePayload>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),

    editStorage: builder.mutation<void, IEditStoragePayload>({
      query: (body) => ({
        url: `/${body._id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteStorage: builder.mutation<void, IDeleteStoragesPayload>({
      query: (body) => ({
        url: `/`,
        method: "DELETE",
        body,
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
  useEditStorageMutation,
  useDeleteStorageMutation,
  useLazySearchStoragesOptionsQuery,
} = storagesApi;
