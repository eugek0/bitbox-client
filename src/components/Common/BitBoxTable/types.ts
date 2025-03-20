import {
  BitBoxTableContainerProps,
  BitBoxTableModalProps,
  BitBoxTableRecord,
} from "@/containers/Common/BitBoxTableContainer/types";

export interface BitBoxTableProps<T extends BitBoxTableRecord>
  extends BitBoxTableContainerProps<T> {
  modalProps: BitBoxTableModalProps;
}
