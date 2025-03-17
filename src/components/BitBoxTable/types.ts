import {
  BitBoxTableContainerProps,
  BitBoxTableModalProps,
  BitBoxTableRecord,
} from "@/containers/BitBoxTableContainer/types";

export interface BitBoxTableProps<T extends BitBoxTableRecord>
  extends BitBoxTableContainerProps<T> {
  modalProps: BitBoxTableModalProps;
}
