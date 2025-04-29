import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";
import { FormInstance } from "antd";

export interface ProfileEditFormProps {
  form: FormInstance<ProfileEditFormFields>;
  avatar?: string;
  isEditing?: boolean;
  isTelegramHidden?: boolean;
  initialValues?: Nullable<ProfileEditFormFields>;
  onFinish?: (values: ProfileEditFormFields) => void;
}

export type ProfileEditFormFields = Pick<
  IProfile,
  "login" | "prefered_contacts" | "telegram" | "name" | "lastname" | "email"
>;
