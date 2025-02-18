import { ModalProps } from "antd";

export interface CreateStorageModalContainerProps
  extends Pick<ModalProps, "open"> {
  handleCloseModal: () => void;
  handleOkModal: () => void;
}
