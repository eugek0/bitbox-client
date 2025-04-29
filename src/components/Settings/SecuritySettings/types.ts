import { FormInstance } from "antd";
import { ChangePasswordFormFields } from "./ChangePasswordForm/types";

export interface SecuritySettingsProps {
  form: FormInstance<ChangePasswordFormFields>;
  isChanging?: boolean;
  handleChangePassword?: (values: ChangePasswordFormFields) => void;
}
