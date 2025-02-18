import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IStoragesTableRecord } from "./StoragesTable/types";

export const storagesApi = createApi({
  reducerPath: "storages/api",
  baseQuery: fetchMainBaseQuery("/storages"),
  endpoints: (builder) => ({
    getStorages: builder.query<IStoragesTableRecord[], void>({
      query: () => ({
        url: "/",
      }),
    }),
  }),
});

export const { useGetStoragesQuery } = storagesApi;
