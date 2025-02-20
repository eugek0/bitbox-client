import { ModalProps } from "antd";
import { FormInstance } from "antd/lib";

export interface CreateStorageModalProps
  extends Omit<ModalProps, "children" | "title" | "footer"> {
  form: FormInstance;
  loading: boolean;
}
