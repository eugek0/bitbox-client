import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IStoragesTableRecord } from "../Storages/StoragesTableContainer/types";
import {
  ICreateDirectoryPayload,
  IEntity,
  IGetStorageEntitiesPayload,
  IGetStorageEntityPayload,
  IGetStorageEntitiesResponse,
  IGetStorageFilePayload,
} from "./types";

export const storageApi = createApi({
  reducerPath: "storage/api",
  baseQuery: fetchMainBaseQuery(""),
  endpoints: (builder) => ({
    getStorage: builder.query<IStoragesTableRecord, string>({
      query: (storageid: string) => ({
        url: `/storages/${storageid}`,
      }),
      keepUnusedDataFor: 0,
    }),

    getStorageEntities: builder.query<
      IGetStorageEntitiesResponse,
      IGetStorageEntitiesPayload
    >({
      query: ({ storageid, params }) => ({
        url: `/entities/${storageid}`,
        params,
      }),
      keepUnusedDataFor: 0,
    }),

    getStorageEntity: builder.query<IEntity, IGetStorageEntityPayload>({
      query: ({ storageid, entityid }) => ({
        url: `/entities/${storageid}/${entityid}`,
      }),
    }),

    getStorageFile: builder.query<Blob, IGetStorageFilePayload>({
      query: ({ storageid, fileid }) => ({
        url: `/entities/${storageid}/blob/${fileid}`,
        responseHandler: (response) => response.blob(),
      }),
    }),

    createDirectory: builder.mutation<void, ICreateDirectoryPayload>({
      query: ({ storageid, body }) => ({
        url: `/entities/mkdir/${storageid}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetStorageQuery,
  useGetStorageEntitiesQuery,
  useGetStorageEntityQuery,
  useLazyGetStorageFileQuery,
  useCreateDirectoryMutation,
} = storageApi;
