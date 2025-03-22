import { ICreateStorageModalRules } from "./types";
import { REQUIRED_FIELD_MESSAGE } from "@/core/constants";

export const CREATE_STORAGE_MODAL_RULES: ICreateStorageModalRules = {
  default: [
    {
      required: true,
      whitespace: true,
      message: REQUIRED_FIELD_MESSAGE,
    },
  ],
  size: [
    {
      required: true,
      message: REQUIRED_FIELD_MESSAGE,
    },
  ],
};
