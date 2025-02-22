import { ILoginFormValues } from "@/containers/Auth/LoginFormContainer/types";
import { IRegisterFormValues } from "@/containers/Auth/RegisterFormContainer/types";
import { FormProps } from "antd";
import { Rule } from "antd/es/form";
import { ReactNode } from "react";

export interface AuthFormProps {
  form: FormProps["form"];
  loading?: boolean;
  children?: ReactNode;
  redirectButton?: IAuthRedirectButton;
  onFinish?: FormProps["onFinish"];
}

export interface IAuthRedirectButton {
  show?: boolean;
  text?: string;
  link?: string;
}

export interface IAuthFormRules
  extends Partial<
    Record<keyof ILoginFormValues | keyof IRegisterFormValues, Rule[]>
  > {
  default: Rule[];
}

export type AuthFormInstanceProps = Omit<AuthFormProps, "children">;
