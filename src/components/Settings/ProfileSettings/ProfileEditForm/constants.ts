import { Rule } from "antd/es/form";
import { ProfileEditFormFields } from "./types";
import { REQUIRED_FIELD_MESSAGE } from "@/core/constants";
import { DefaultOptionType } from "antd/es/select";

export const PROFILE_EDIT_FORM_RULES: Partial<
  Record<keyof ProfileEditFormFields | "default", Rule[]>
> = {
  default: [{ required: true, message: REQUIRED_FIELD_MESSAGE }],
  telegram: [
    {
      required: true,
      message: REQUIRED_FIELD_MESSAGE,
      validator: (_, value: string) =>
        value.startsWith("@")
          ? Promise.reject('Имя пользователя не должно начинаться с "@"')
          : Promise.resolve(),
    },
  ],
};

export const PROFILE_EDIT_FORM_CONTACT_OPTIONS: DefaultOptionType[] = [
  {
    value: "email",
    label: "Почта",
  },
  {
    value: "telegram",
    label: "Телеграм",
  },
  {
    value: "none",
    label: "Не показывать контакты",
  },
];
