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
  IUploadEntitiesPayload,
  IDeleteEntitiesPayload,
  IPasteEntitiesPayload,
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
      query: ({ storageid, body }) => ({
        url: `/entities/blob/${storageid}`,
        method: "POST",
        body,
      }),
    }),

    createDirectory: builder.mutation<void, ICreateDirectoryPayload>({
      query: ({ storageid, body }) => ({
        url: `/entities/mkdir/${storageid}`,
        method: "POST",
        body,
      }),
    }),

    uploadEntities: builder.mutation<void, IUploadEntitiesPayload>({
      query: ({ storageid, body }) => ({
        url: `/entities/${storageid}`,
        method: "POST",
        body,
      }),
    }),

    deleteEntities: builder.mutation<void, IDeleteEntitiesPayload>({
      query: ({ storageid, body }) => ({
        url: `/entities/rm/${storageid}`,
        method: "DELETE",
        body,
      }),
    }),

    pasteEntities: builder.mutation<void, IPasteEntitiesPayload>({
      query: ({ storageid, body }) => ({
        url: `/entities/paste/${storageid}`,
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
  useUploadEntitiesMutation,
  useDeleteEntitiesMutation,
  usePasteEntitiesMutation,
} = storageApi;
