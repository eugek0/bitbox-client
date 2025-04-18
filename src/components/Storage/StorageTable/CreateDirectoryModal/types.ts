import { InputRef, ModalProps } from "antd";
import { Rule } from "antd/es/form";
import { FormInstance } from "antd/lib";
import { KeyboardEventHandler, Ref } from "react";

export interface CreateDirectoryModalProps extends Omit<ModalProps, "title"> {
  form: FormInstance;
  nameRef?: Ref<InputRef>;
  handleKeyDown?: KeyboardEventHandler<HTMLFormElement>;
}

export interface ICreateDirectoryModalFields {
  name: string;
}

export interface ICreateDirectoryModalRules
  extends Partial<Record<keyof ICreateDirectoryModalFields, Rule[]>> {
  default: Rule[];
}
