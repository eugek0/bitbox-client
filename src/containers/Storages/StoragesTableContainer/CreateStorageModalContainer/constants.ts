import { REQUIRED_FIELD_MESSAGE } from "@/core/constants";
import { ICreateStorageModalRules, TCreateStorageModalFields } from "./types";
import { convertBytes } from "@/core/utils";

export const CREATE_STORAGE_MODAL_RULES: (
  used: number,
) => ICreateStorageModalRules = (used) => ({
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
    {
      validator: (_, value) => {
        if (value && value < used) {
          return Promise.reject(
            `${convertBytes(value)} < ${convertBytes(used)}`,
          );
        }
        return Promise.resolve("");
      },
    },
  ],
});

export const CREATE_STORAGE_MODAL_INITIAL_VALUES: Partial<
  Record<keyof TCreateStorageModalFields, any>
> = {
  access: "public",
  defaultRole: "watcher",
};
