import { REQUIRED_FIELD_MESSAGE } from "@/core/constants";
import { ChangePasswordFormFields } from "./types";
import { Rule } from "antd/es/form";

export const CHANGE_PASSWORD_FORM_RULES: Partial<
  Record<keyof ChangePasswordFormFields | "default", Rule[]>
> = {
  default: [{ required: true, message: REQUIRED_FIELD_MESSAGE }],
  newPassword: [
    { required: true, message: REQUIRED_FIELD_MESSAGE },
    {
      min: 5,
      message: "Длина должна быть не менее 5 символов",
      validateTrigger: ["onSubmit"],
    },
  ],
  repeatNewPassword: [
    { required: true, message: REQUIRED_FIELD_MESSAGE },
    ({ getFieldValue }) => ({
      message: "Пароли не совпадают",
      validator: (_, value) => {
        const newPassword = getFieldValue("newPassword");

        if (value && value !== newPassword) {
          return Promise.reject();
        }

        return Promise.resolve();
      },
    }),
  ],
};
