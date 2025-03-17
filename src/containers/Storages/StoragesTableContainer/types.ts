import { TCreateStorageModalFields } from "./CreateStorageModalContainer/types";

export interface IStoragesTableRecord {
  name: string;
  description: string;
  owner: string;
  createdAt: string;
  used: number;
  size: number;
}
