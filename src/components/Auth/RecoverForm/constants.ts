import { Rule } from "antd/es/form";
import { REQUIRED_FIELD_MESSAGE } from "@/core/constants";

export const RECOVER_FORM_RULES: Record<string, Rule[]> = {
  default: [{ required: true, message: REQUIRED_FIELD_MESSAGE }],
  email: [
    { required: true, message: REQUIRED_FIELD_MESSAGE },
    {
      type: "email",
      message: "Невалидный Email адрес",
      validateTrigger: ["onSubmit"],
    },
  ],
  password: [
    {
      required: true,
      message: REQUIRED_FIELD_MESSAGE,
    },
    {
      min: 5,
      message: "Длина должна быть не менее 5 символов",
      validateTrigger: ["onSubmit"],
    },
  ],
  repeatPassword: [
    {
      required: true,
      message: REQUIRED_FIELD_MESSAGE,
    },
    ({ getFieldValue }) => ({
      message: "Пароли не совпадают",
      validator: (_, value) => {
        const password = getFieldValue("password");

        if (value && value !== password) {
          return Promise.reject();
        }
        return Promise.resolve();
      },
    }),
  ],
};
