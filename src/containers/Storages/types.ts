export interface IStorage {
  _id: string;
  name: string;
  description: string;
  owner: string;
  used: number;
  size: number;
  access: TStorageAccess;
  members?: string[];
  restrict_file_size?: boolean;
  max_file_size?: number;
  restrict_files_count?: boolean;
  max_files_count?: number;
}

export type TStorageAccess = "public" | "private";

export type TCreateStoragePayload = Pick<
  IStorage,
  | "name"
  | "description"
  | "size"
  | "access"
  | "members"
  | "restrict_file_size"
  | "max_file_size"
  | "restrict_files_count"
  | "max_files_count"
>;

export interface IEditStoragePayload extends TCreateStoragePayload {
  _id: string;
}

export interface ISearchStoragesOptionsPayload {
  name: string;
}
