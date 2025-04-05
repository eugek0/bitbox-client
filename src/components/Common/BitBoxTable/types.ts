import { MouseEventHandler } from "react";
import { DropDownProps } from "antd";
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
  modalProps: BitBoxTableModalProps;
  infoModalProps: BitBoxTableInfoModalProps;
  contextMenuProps: BitBoxTableContextMenuProps;
  handleBorderClick?: MouseEventHandler<HTMLDivElement>;
  onRow: TableProps["onRow"];
}

export type BitBoxTableContextMenuProps = Pick<
  IBitBoxTableContextMenu,
  "show"
> &
  DropDownProps;
