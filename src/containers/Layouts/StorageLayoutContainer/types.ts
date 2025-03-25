import { PropsWithChildren } from "react";
import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";

export type StorageLayoutContainerProps = PropsWithChildren;

export type TStorageContext = Partial<IStoragesTableRecord>;
