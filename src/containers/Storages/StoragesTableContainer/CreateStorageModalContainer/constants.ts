import { TCreateStorageModalFields } from "./types";

export const CREATE_STORAGE_MODAL_INITIAL_VALUES: Partial<
  Record<keyof TCreateStorageModalFields, any>
> = {
  access: "public",
  defaultRole: "watcher",
};
