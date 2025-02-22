import { FormProps } from "antd";
import { Rule } from "antd/es/form";
import { ReactNode } from "react";

export interface AuthFormProps {
  form: FormProps["form"];
  children?: ReactNode;
  redirectButton?: IAuthRedirectButton;
  onFinish?: FormProps["onFinish"];
}

export interface IAuthRedirectButton {
  show?: boolean;
  text?: string;
  link?: string;
}

export interface IAuthFormRules {
  default: Rule[];
  email: Rule[];
  password: Rule[];
  repeatPassword: Rule[];
}

export type AuthFormInstanceProps = Omit<AuthFormProps, "children">;
