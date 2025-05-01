import { ModalProps } from "antd";

export interface ChangePasswordModalProps
  extends Omit<ModalProps, "children" | "title" | "footer"> {
  email: string;
}
