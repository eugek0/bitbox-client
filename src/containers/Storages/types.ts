export interface ICreateStoragePayload {
  name: string;
  description?: string;
  size: number;
}

export interface ISearchStoragesOptionsPayload {
  name: string;
}
