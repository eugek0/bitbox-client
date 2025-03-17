import { TableColumnType } from "antd";
import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";

export const STORAGE_TABLE_COLUMNS: TableColumnType<IStoragesTableRecord>[] = [
  {
    title: "Название",
    dataIndex: "name",
    width: "25%",
    ellipsis: true,
  },
];
