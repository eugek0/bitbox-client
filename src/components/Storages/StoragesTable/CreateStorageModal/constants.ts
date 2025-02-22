import { TCreateStorageModalFields } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
import { ICreateStorageModalRules } from "./types";

export const CREATE_STORAGE_MODAL_RULES: ICreateStorageModalRules = {
  default: [
    {
      required: true,
      whitespace: true,
      message: "Обязательное поле",
    },
  ],
  size: [
    {
      required: true,
      message: "Обязательное поле",
    },
  ],
};

export const CREATE_STORAGE_MODAL_INITIAL_VALUES: Partial<
  Record<keyof TCreateStorageModalFields, any>
> = {
  access: "public",
};
