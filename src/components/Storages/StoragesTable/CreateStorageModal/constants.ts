import {
  TCreateStorageModalOptions,
  TCreateStorageModalRoleLabels,
} from "./types";

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
