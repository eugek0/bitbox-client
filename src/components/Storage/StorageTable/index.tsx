import { FC } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import STORAGE_TABLE_COLUMNS from "./columns";
import { StorageTableProps } from "./types";
import styles from "./styles.module.scss";

const StorageTable: FC<StorageTableProps> = ({ data }) => {
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns: STORAGE_TABLE_COLUMNS,
    data,
  });

  return (
    <div className={styles["body"]}>
      <table className={styles["table"]}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StorageTable;
