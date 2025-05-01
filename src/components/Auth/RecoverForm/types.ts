import { FormProps } from "antd";
import { PropsWithChildren } from "react";

export type RecoverFormProps = Pick<FormProps, "form" | "onFinish"> &
  PropsWithChildren;

export interface RecoverFormInstanceProps
  extends Omit<RecoverFormProps, "children"> {
  loading?: boolean;
}
