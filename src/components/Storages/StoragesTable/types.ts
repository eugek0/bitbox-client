import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";
import { TableProps } from "antd";

export interface StoragesTableProps extends Pick<TableProps, "onRow"> {
  storages: IStoragesTableRecord[];
  loading: boolean;
  handleClickCreate: () => void;
}
