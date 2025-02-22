import { ModalProps } from "antd";
import { Rule } from "antd/es/form";
import { FormInstance } from "antd/lib";

export interface CreateStorageModalProps
  extends Omit<ModalProps, "children" | "title" | "footer"> {
  form: FormInstance;
  loading: boolean;
}

export interface ICreateStorageModalRules {
  default: Rule[];
}
