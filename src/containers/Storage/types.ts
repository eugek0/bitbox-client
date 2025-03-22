import { IStoragesTableRecord } from "../Storages/StoragesTableContainer/types";

export type EntityType = "file" | "folder";

export interface IEntity {
  _id: string;

  name: string;

  extension: string;

  type: EntityType;

  size: number;

  storage: string;

  path: string;
}

export type TStorageContext = Partial<IStoragesTableRecord>;
