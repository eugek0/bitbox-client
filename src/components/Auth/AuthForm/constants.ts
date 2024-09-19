import { IAuthFormRules } from "./types";

export const AUTH_FORM_RULES: IAuthFormRules = {
  default: [
    {
      required: true,
      message: "Обязательное поле",
      validateTrigger: ["onSubmit"],
    },
  ],
  email: [
    {
      required: true,
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
      message: "Обязательное поле",
      validateTrigger: ["onSubmit"],
    },
    {
      min: 5,
      message: "Пароль должен состоять минимум из 5 символов",
      validateTrigger: ["onSubmit"],
    },
  ],
  repeatPassword: (form) => [
    {
      validator: (_, value) => {
        const { password } = form?.getFieldsValue();

        if (value && value !== password) {
          return Promise.reject(new Error("Пароли не совпадают"));
        }
        return Promise.resolve();
      },
    },
  ],
} as const;
