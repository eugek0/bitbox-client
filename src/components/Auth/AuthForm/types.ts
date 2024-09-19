import { FormProps } from "antd";
import { Rule } from "antd/es/form";
import { FormInstance } from "rc-field-form/lib/interface";
import { ReactNode } from "react";

export interface AuthFormProps {
  form: FormProps["form"];
  onFinish?: FormProps["onFinish"];
  children?: ReactNode;
}

export interface IAuthFormRules {
  default: Rule[];
  email: Rule[];
  password: Rule[];
  repeatPassword: (form?: FormInstance) => Rule[];
}

export type AuthFormInstanceProps = Omit<AuthFormProps, "children">;
