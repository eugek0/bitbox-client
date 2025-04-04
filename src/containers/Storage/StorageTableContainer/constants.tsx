import { TableColumnType } from "antd";
import { convertBytes } from "@/core/utils";
import { IEntity } from "../types";

export const STORAGE_TABLE_COLUMNS: TableColumnType<IEntity>[] = [
  {
    title: "Название",
    dataIndex: "fullname",
    width: "25%",
    sorter: {
      compare: (a, b) => b.name.localeCompare(a.name),
    },
    showSorterTooltip: false,
    ellipsis: true,
  },
  {
    title: "Размер",
    dataIndex: "size",
    width: "6.25%",
    sorter: {
      compare: (a, b) => a.size - b.size,
    },
    showSorterTooltip: false,
    render: (size) => convertBytes(size),
  },
];
