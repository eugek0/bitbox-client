import { FormProps } from "antd";
import { ReactNode } from "react";

export interface AuthFormProps {
  form: FormProps["form"];
  onFinish: FormProps["onFinish"];
  children?: ReactNode;
}

export type AuthFormInstanceProps = Omit<AuthFormProps, "children">;
