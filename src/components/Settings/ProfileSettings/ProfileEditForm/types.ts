import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";
import { FormProps } from "antd/lib";

export interface ProfileEditFormProps
  extends Pick<FormProps<ProfileEditFormFields>, "form" | "onFinish"> {
  avatar?: string;
  isEditing?: boolean;
  isTelegramHidden?: boolean;
  initialValues?: Nullable<ProfileEditFormFields>;
  handleChangeAvatar?: () => void;
  handleResetAvatar?: () => void;
}

export type ProfileEditFormFields = Pick<
  IProfile,
  "login" | "prefered_contacts" | "telegram" | "name" | "lastname" | "email"
>;
