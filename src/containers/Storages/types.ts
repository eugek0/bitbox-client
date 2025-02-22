export interface ICreateStoragePayload {
  name: string;
  description?: string;
  size: number;
  access?: TStorageAccess;
  members?: string[];
}

export interface ISearchStoragesOptionsPayload {
  name: string;
}

export type TStorageAccess = "public" | "private";
