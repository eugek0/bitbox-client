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

export interface IEntityBreadcrumb {
  _id: string;
  fullname: string;
}

export interface IGetStorageEntitiesPayload {
  storageid: string;
  params: {
    parent?: string;
  };
}

export interface IGetStorageEntitiesResponse {
  items: IEntity[];
  breadcrumbs: IEntityBreadcrumb[];
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
