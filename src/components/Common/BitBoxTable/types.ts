import { DragEventHandler, MouseEventHandler } from "react";
import { DropDownProps, TablePaginationConfig } from "antd";
import { TableProps } from "antd/lib";
import {
  BitBoxTableContainerProps,
  BitBoxTableInfoModalProps,
  BitBoxTableModalProps,
  BitBoxTableRecord,
  IBitBoxTableContextMenu,
} from "@/containers/Common/BitBoxTableContainer/types";

export interface BitBoxTableProps<T extends BitBoxTableRecord>
  extends Omit<BitBoxTableContainerProps<T>, "contextMenu"> {
  isDragOver: boolean;
  hideHeader?: boolean;
  pagination?: TablePaginationConfig;
  modalProps: BitBoxTableModalProps;
  infoModalProps: BitBoxTableInfoModalProps;
  contextMenuProps: BitBoxTableContextMenuProps;
  handleBorderClick: MouseEventHandler<HTMLDivElement>;
  handleBorderContextMenu: MouseEventHandler<HTMLDivElement>;
  handleDragEnter: DragEventHandler<HTMLDivElement>;
  handleDragLeave: DragEventHandler<HTMLDivElement>;
  onRow: TableProps["onRow"];
}

export type BitBoxTableContextMenuProps = Pick<
  IBitBoxTableContextMenu,
  "show"
> &
  DropDownProps;
