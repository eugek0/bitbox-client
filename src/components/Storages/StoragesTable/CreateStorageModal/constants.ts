import {
  ICreateStorageModalRules,
  TCreateStorageModalOptions,
  TCreateStorageModalRoleLabels,
} from "./types";
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

export const CREATE_STORAGE_MODAL_ROLE_LABELS: TCreateStorageModalRoleLabels = {
  watcher: "Только просмотр",
  maintainer: "Просмотр и запись",
  administrator: "Полный доступ",
};

export const CREATE_STORAGE_MODAL_OPTIONS: TCreateStorageModalOptions = {
  defaultRole: [
    {
      value: "watcher",
      label: CREATE_STORAGE_MODAL_ROLE_LABELS.watcher,
    },
    {
      value: "maintainer",
      label: CREATE_STORAGE_MODAL_ROLE_LABELS.maintainer,
    },
    {
      value: "administrator",
      label: CREATE_STORAGE_MODAL_ROLE_LABELS.administrator,
    },
  ],
};
