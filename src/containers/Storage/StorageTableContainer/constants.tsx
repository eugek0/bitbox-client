import { TableColumnType } from "antd";
import { convertBytes } from "@/core/utils";
import { IEntity } from "../types";

export const STORAGE_TABLE_COLUMNS: TableColumnType<IEntity>[] = [
  {
    title: "Название",
    dataIndex: "name",
    width: "25%",
    ellipsis: true,
    render: (name, record) => name || `.${record.extension}`,
  },
  {
    title: "Размер",
    dataIndex: "size",
    width: "6.25%",
    sorter: true,
    showSorterTooltip: false,
    render: (size) => convertBytes(size),
  },
];
