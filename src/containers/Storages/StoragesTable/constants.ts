import { TableColumnType } from "antd";
import { IStoragesTableRecord } from "./types";

export const STORAGES_TABLE_COLUMNS: TableColumnType<IStoragesTableRecord>[] = [
  {
    title: "Название",
    dataIndex: "name",
    width: "25%",
  },
  {
    title: "Описание",
    dataIndex: "description",
    width: "50%",
  },
  {
    title: "Создатель",
    dataIndex: "owner",
    width: "12.5%",
  },
  {
    title: "Занято",
    dataIndex: "used",
    width: "6.25%",
  },
  {
    title: "Размер",
    dataIndex: "size",
    width: "6.25%",
  },
];
