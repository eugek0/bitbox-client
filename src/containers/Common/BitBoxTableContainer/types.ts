import { FC, Dispatch, MouseEvent, ReactNode } from "react";
import { BreadcrumbProps, MenuProps, TableColumnType, TableProps } from "antd";
import { Nullable } from "@/core/types";
import { ButtonProps } from "antd/lib";

export type BitBoxTableRecord = Record<string, any>;

export interface BitBoxTableContainerProps<T extends BitBoxTableRecord>
  extends Pick<TableProps, "onRow"> {
  records: T[];
  columns: TableColumnType<T>[];
  loading?: boolean;
  header?: IBitBoxTableHeader;
  modal?: FC<BitBoxTableModalProps>;
  infoModal?: FC<BitBoxTableInfoModalProps>;
  contextMenu?: IBitBoxTableContextMenu;
  selected?: BitBoxTableRecord[];
  breadcrumbs?: BreadcrumbProps["items"];
  handleSelect?: (selected: BitBoxTableRecord[]) => void;
  handleAddRow?: (values: Record<string, any>) => Promise<void> | void;
  handleEditRow?: (
    values: Record<string, any>,
    record: BitBoxTableRecord,
  ) => Promise<void> | void;
}

export interface IBitBoxTableContextMenu {
  show?:
    | boolean
    | ((record: BitBoxTableRecord, selected: BitBoxTableRecord[]) => boolean);
  menu?: (props: BitBoxTableContextMenuDropdownProps) => MenuProps;
}

export interface BitBoxTableContextMenuDropdownProps {
  selected: BitBoxTableRecord[];
  modalConfig: IBitBoxTableModalConfig;
  infoModalConfig: IBitBoxTableInfoModalConfig;
  setContextMenuOpen: Dispatch<boolean>;
  setModalConfig: Dispatch<IBitBoxTableModalConfig>;
  setInfoModalConfig: Dispatch<IBitBoxTableInfoModalConfig>;
}

export interface IBitBoxTableHeader {
  title?: string;
  button?: BitBoxTableButtonProps;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export interface BitBoxTableButtonProps extends Omit<ButtonProps, "onClick"> {
  onClick?: (
    tools: Pick<BitBoxTableModalProps, "config" | "setConfig">,
    event: MouseEvent,
  ) => void;
}

export interface BitBoxTableModalProps
  extends Pick<
    BitBoxTableContainerProps<any>,
    "handleAddRow" | "handleEditRow"
  > {
  config: IBitBoxTableModalConfig;
  setConfig: Dispatch<IBitBoxTableModalConfig>;
  selected: BitBoxTableRecord[];
}

export interface BitBoxTableInfoModalProps {
  config: IBitBoxTableInfoModalConfig;
  setConfig: Dispatch<IBitBoxTableInfoModalConfig>;
  selected: BitBoxTableRecord;
}

export interface IBitBoxTableModalConfig {
  open: boolean;
  mode: Nullable<"add" | "edit">;
}

export interface IBitBoxTableInfoModalConfig {
  open: boolean;
}
