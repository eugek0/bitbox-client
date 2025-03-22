import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IStoragesTableRecord } from "../Storages/StoragesTableContainer/types";
import {
  IEntity,
  IGetStorageEntitiesPayload,
  IGetStorageEntityPayload,
  IGetStorageFilePayload,
} from "./types";

export const storageApi = createApi({
  reducerPath: "storage/api",
  baseQuery: fetchMainBaseQuery("/storages"),
  endpoints: (builder) => ({
    getStorage: builder.query<IStoragesTableRecord, string>({
      query: (storageid: string) => ({
        url: `/${storageid}`,
      }),
      keepUnusedDataFor: 0,
    }),

    getStorageEntities: builder.query<IEntity[], IGetStorageEntitiesPayload>({
      query: ({ storageid, params }) => ({
        url: `/${storageid}/entities`,
        params,
      }),
    }),

    getStorageEntity: builder.query<IEntity, IGetStorageEntityPayload>({
      query: ({ storageid, entityid }) => ({
        url: `/${storageid}/entity/${entityid}`,
      }),
    }),

    getStorageFile: builder.query<Blob, IGetStorageFilePayload>({
      query: ({ storageid, fileid }) => ({
        url: `/${storageid}/file/${fileid}`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetStorageQuery,
  useGetStorageEntitiesQuery,
  useGetStorageEntityQuery,
  useLazyGetStorageFileQuery,
} = storageApi;
