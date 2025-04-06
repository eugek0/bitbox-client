import { ModalProps } from "antd";
import { Rule } from "antd/es/form";
import { FormInstance } from "antd/lib";

export interface CreateDirectoryModalProps extends Omit<ModalProps, "title"> {
  form: FormInstance;
}

export interface ICreateDirectoryModalFields {
  name: string;
}

export interface ICreateDirectoryModalRules
  extends Partial<Record<keyof ICreateDirectoryModalFields, Rule[]>> {
  default: Rule[];
}
