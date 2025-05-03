import { FormInstance } from "antd";
import { ProfileEditFormFields } from "./ProfileEditForm/types";
import { Nullable } from "@/core/types";
import { MouseEventHandler } from "react";

export interface ProfileSettingsProps {
  form: FormInstance<ProfileEditFormFields>;
  avatar?: string;
  isTelegramHidden?: boolean;
  isEditing?: boolean;
  initialValues?: Nullable<ProfileEditFormFields>;
  image?: string;
  handleEdit?: (values: ProfileEditFormFields) => void;
  handleChangeAvatar?: () => void;
  handleResetAvatar?: () => void;
  handleClosechangeAvatar: MouseEventHandler<HTMLButtonElement>;
}
