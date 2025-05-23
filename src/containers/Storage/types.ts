import { Nullable } from "@/core/types";

export type EntityType = "file" | "directory";

export interface IStorageSliceState {
  buffer: IStorageBuffer;
}

export interface IStorageBuffer {
  items: IEntity[];
  type: TStorageBufferType;
}

export type TStorageBufferType = Nullable<"copy" | "cut">;

export interface IEntity {
  _id: string;
  fullname: string;
  name: string;
  extension: string;
  type: EntityType;
  size: number;
  storage: string;
  path: string;
  uploader: string;
  uploadedAt: string;
  parent: string;
}

export interface IEntityBreadcrumb {
  _id: string;
  fullname: string;
}

export interface IGetStorageEntitiesPayload {
  storageid: string;
  params: {
    parent?: string;
    page: number;
    limit?: number;
  };
}

export interface IGetStorageEntitiesResponse {
  items: IEntity[];
  breadcrumbs: IEntityBreadcrumb[];
  count: number;
}

export interface IGetStorageEntityPayload {
  storageid: string;
  entityid: string;
}

export interface IGetStorageFilePayload {
  storageid: string;
  body: {
    entities: string[];
  };
}

export interface ICreateDirectoryPayload {
  storageid: string;
  body: {
    name: string;
    parent?: string;
  };
}

export interface IUploadEntitiesPayload {
  storageid: string;
  body: FormData;
}

export interface IDeleteEntitiesPayload {
  storageid: string;
  body: {
    entities: string[];
  };
}

export interface IPasteEntitiesPayload {
  storageid: string;
  body: {
    entities: string[];
    parent: Nullable<string>;
    type: "copy" | "cut";
  };
}

export interface IRenameEntityPayload {
  storageid: string;
  body: {
    entity: string;
    fullname: string;
  };
}
