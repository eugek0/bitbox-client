import { Rule } from "antd/es/form";

export const DEFAULT_AUTH_FORM_RULES: Rule[] = [
  {
    required: true,
    message: "Обязательное поле",
  },
];
