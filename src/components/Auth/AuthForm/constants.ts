import { IAuthFormRules } from "./types";

export const AUTH_FORM_RULES: IAuthFormRules = {
  default: [
    {
      required: true,
      whitespace: true,
      message: "Обязательное поле",
      validateTrigger: ["onSubmit"],
    },
  ],
  email: [
    {
      required: true,
      whitespace: true,
      message: "Обязательное поле",
      validateTrigger: ["onSubmit"],
    },
    {
      type: "email",
      message: "Невалидный Email адрес",
      validateTrigger: ["onSubmit"],
    },
  ],
  password: [
    {
      required: true,
      whitespace: true,
      message: "Обязательное поле",
      validateTrigger: ["onSubmit"],
    },
    {
      min: 5,
      message: "Длина должна быть не менее 5 символов",
      validateTrigger: ["onSubmit"],
    },
  ],
  repeatPassword: [
    ({ getFieldsValue }) => ({
      validator: (_, value) => {
        const password = getFieldsValue()?.password;

        if (value && value !== password) {
          return Promise.reject(new Error("Пароли не совпадают"));
        }
        return Promise.resolve();
      },
    }),
  ],
} as const;
