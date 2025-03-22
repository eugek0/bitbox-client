import {
  BitBoxTableRecord,
  IBitBoxTableModalConfig,
} from "@/containers/Common/BitBoxTableContainer/types";
import { TCreateStorageModalFields } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
import { ModalProps } from "antd";
import { Rule } from "antd/es/form";
import { FormInstance } from "antd/lib";

export interface CreateStorageModalProps
  extends Omit<ModalProps, "children" | "title" | "footer"> {
  config: IBitBoxTableModalConfig;
  form: FormInstance;
  loading: boolean;
  selected: BitBoxTableRecord[];
  disabled?: Partial<Record<keyof TCreateStorageModalFields, boolean>>;
  required?: Partial<Record<keyof TCreateStorageModalFields, boolean>>;
  initialValues?: BitBoxTableRecord;
}

export interface ICreateStorageModalRules
  extends Partial<Record<keyof TCreateStorageModalFields, Rule[]>> {
  default: Rule[];
}
