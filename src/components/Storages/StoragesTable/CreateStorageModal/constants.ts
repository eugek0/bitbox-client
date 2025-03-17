import { TCreateStorageModalFields } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
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

export const CREATE_STORAGE_MODAL_INITIAL_VALUES: Partial<
  Record<keyof TCreateStorageModalFields, any>
> = {
  access: "public",
};
