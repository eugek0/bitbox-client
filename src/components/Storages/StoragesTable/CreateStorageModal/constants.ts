import { ICreateStorageModalRules } from "./types";

export const CREATE_STORAGE_MODAL_RULES: ICreateStorageModalRules = {
  default: [
    {
      required: true,
      whitespace: true,
      message: "Обязательное поле",
    },
  ],
};
