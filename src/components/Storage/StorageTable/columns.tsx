import { createColumnHelper } from "@tanstack/react-table";
import { StorageTableData } from "./types";

const column = createColumnHelper<StorageTableData>();

const STORAGE_TABLE_COLUMNS = [
  column.accessor("name", {
    header: "Название",
    cell: (info) => info.getValue(),
  }),
  column.accessor("size", {
    header: "Размер",
    cell: (info) => info.getValue(),
  }),
  column.accessor("date", {
    header: "Дата",
    cell: (info) => info.getValue(),
  }),
];

export default STORAGE_TABLE_COLUMNS;
