import { FormInstance } from "antd";

export interface ChangePasswordFormProps {
  form: FormInstance<ChangePasswordFormFields>;
  isChanging?: boolean;
  onFinish?: (values: ChangePasswordFormFields) => void;
}

export interface ChangePasswordFormFields {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}
