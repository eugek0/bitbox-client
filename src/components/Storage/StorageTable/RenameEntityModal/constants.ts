import { Rule } from "antd/es/form";
import { IRenameEntityModalFields } from "@/containers/Storage/StorageTableContainer/RenameEntityModalContainer/types";
import { REQUIRED_FIELD_MESSAGE } from "@/core/constants";

export const RENAME_ENTITY_MODAL_RULES: Partial<
  Record<keyof IRenameEntityModalFields | "default", Rule[]>
> = {
  default: [
    { required: true, message: REQUIRED_FIELD_MESSAGE, whitespace: true },
  ],
};
