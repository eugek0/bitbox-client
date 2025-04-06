import { REQUIRED_FIELD_MESSAGE } from "@/core/constants";
import { ICreateDirectoryModalRules } from "./types";

export const CREATE_DIRECTORY_MODAL_RULES: ICreateDirectoryModalRules = {
  default: [
    {
      required: true,
      whitespace: true,
      message: REQUIRED_FIELD_MESSAGE,
    },
  ],
};
