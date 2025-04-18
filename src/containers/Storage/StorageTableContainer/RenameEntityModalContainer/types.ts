import { ModalProps } from "antd";
import { IEntity } from "../../types";

export interface RenameEntityModalContainerProps
  extends Pick<ModalProps, "open"> {
  selected: IEntity;
  handleOkModal: (values: IRenameEntityModalFields) => Promise<void>;
  handleCloseModal: () => void;
}

export interface IRenameEntityModalFields {
  fullname: string;
}
