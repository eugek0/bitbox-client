export interface ICreateStoragePayload {
  name: string;
  description?: string;
  size: number;
  access?: TStorageAccess;
  members?: string[];
  restrict_file_size?: boolean;
  max_file_size?: number;
  restrict_files_count?: boolean;
  max_files_count?: number;
}

export interface ISearchStoragesOptionsPayload {
  name: string;
}

export type TStorageAccess = "public" | "private";
