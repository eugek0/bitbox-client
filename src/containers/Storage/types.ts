import { IStoragesTableRecord } from "../Storages/StoragesTableContainer/types";

export type EntityType = "file" | "folder";

export interface IEntity {
  _id: string;

  fullname: string;

  name: string;

  extension: string;

  type: EntityType;

  size: number;

  storage: string;

  path: string;
}

export type TStorageContext = Partial<IStoragesTableRecord>;

export interface IGetStorageEntitiesPayload {
  storageid: string;
  params: {
    path: string;
  };
}

export interface IGetStorageEntityPayload {
  storageid: string;
  entityid: string;
}

export interface IGetStorageFilePayload {
  storageid: string;
  fileid: string;
}
