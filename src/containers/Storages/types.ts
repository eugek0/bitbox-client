export interface IStorage {
  _id: string;
  name: string;
  description: string;
  owner: string;
  used: number;
  size: number;
  access: TStorageAccess;
  members?: IStorageMember[];
  restrictFileSize?: boolean;
  maxFileSize?: number;
  restrictFilesCount?: boolean;
  maxFilesCount?: number;
  defaultRole: TStorageMemberRole;
}

export interface IStorageMember {
  _id: string;
  role: TStorageMemberRole;
}

export type TStorageMemberRole = "watcher" | "maintainer" | "administrator";

export type TStorageAccess = "public" | "private";

export type TCreateStoragePayload = Pick<
  IStorage,
  | "name"
  | "description"
  | "size"
  | "access"
  | "members"
  | "restrictFileSize"
  | "maxFileSize"
  | "restrictFilesCount"
  | "maxFilesCount"
  | "defaultRole"
>;

export interface IEditStoragePayload extends TCreateStoragePayload {
  _id: string;
}

export interface IDeleteStoragesPayload {
  storages: string[];
}

export interface ISearchStoragesOptionsPayload {
  name: string;
}
