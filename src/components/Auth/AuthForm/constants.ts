import { Rule } from "antd/es/form";

export const AUTH_FORM_RULES: Record<
  "default" | "email" | "password" | "repeatPassword",
  Rule[]
> = {
  default: [
    {
      required: true,
      message: "Обязательное поле",
    },
  ],
  email: [
    {
      type: "email",
    },
  ],
  password: [
    {
      min: 5,
    },
  ],
  repeatPassword: [{}],
} as const;
