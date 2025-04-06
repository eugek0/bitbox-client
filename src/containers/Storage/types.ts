export type EntityType = "file" | "directory";

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

export interface IGetStorageEntitiesPayload {
  storageid: string;
  params: {
    parent?: string;
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

export interface ICreateDirectoryPayload {
  storageid: string;
  body: {
    name: string;
  };
}
