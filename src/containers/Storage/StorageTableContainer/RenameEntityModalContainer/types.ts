import { BitBoxTableRecord } from "@/containers/Common/BitBoxTableContainer/types";
import { ModalProps } from "antd";

export interface RenameEntityModalContainerProps
  extends Pick<ModalProps, "open"> {
  selected: BitBoxTableRecord;
  loading: boolean;
  handleOkModal: (values: IRenameEntityModalFields) => Promise<void>;
  handleCloseModal: () => void;
}

export interface IRenameEntityModalFields {
  fullname: string;
}
