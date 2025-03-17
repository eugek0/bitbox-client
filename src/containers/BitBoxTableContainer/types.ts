import { FC, Dispatch, MouseEvent } from "react";
import { TableColumnType, TableProps } from "antd";
import { ButtonProps } from "antd/lib";
import { Nullable } from "@/core/types";

export type BitBoxTableRecord = Record<string, any>;

export interface BitBoxTableContainerProps<T extends BitBoxTableRecord>
  extends Pick<TableProps, "onRow"> {
  records: T[];
  columns: TableColumnType<T>[];
  loading: boolean;
  header?: IBitBoxTableHeader;
  modal?: FC<BitBoxTableModalProps>;
  handleAddRow?: (values: Record<string, any>) => Promise<void> | void;
}

export interface IBitBoxTableHeader {
  title?: string;
  button?: BitBoxTableButtonProps;
}

export interface BitBoxTableButtonProps extends Omit<ButtonProps, "onClick"> {
  onClick?: (
    tools: Pick<BitBoxTableModalProps, "config" | "setConfig">,
    event: MouseEvent,
  ) => void;
}

export interface BitBoxTableModalProps
  extends Pick<BitBoxTableContainerProps<any>, "handleAddRow"> {
  config: IBitBoxTableModalConfig;
  setConfig: Dispatch<IBitBoxTableModalConfig>;
}

export interface IBitBoxTableModalConfig {
  open: boolean;
  mode: Nullable<"add" | "edit">;
}
