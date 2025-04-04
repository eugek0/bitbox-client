import {
  BitBoxTableRecord,
  IBitBoxTableModalConfig,
} from "@/containers/Common/BitBoxTableContainer/types";
import { TCreateStorageModalFields } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
import { TStorageMemberRole } from "@/containers/Storages/types";
import { ModalProps } from "antd";
import { Rule } from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";
import { FormInstance } from "antd/lib";

export interface CreateStorageModalProps
  extends Omit<ModalProps, "children" | "title" | "footer"> {
  config: IBitBoxTableModalConfig;
  form: FormInstance;
  loading: boolean;
  disabled?: Partial<Record<keyof TCreateStorageModalFields, boolean>>;
  required?: Partial<Record<keyof TCreateStorageModalFields, boolean>>;
  initialValues?: BitBoxTableRecord;
}

export interface ICreateStorageModalRules
  extends Partial<Record<keyof TCreateStorageModalFields, Rule[]>> {
  default: Rule[];
}

export type TCreateStorageModalOptions = Partial<
  Record<keyof TCreateStorageModalFields, DefaultOptionType[]>
>;

export type TCreateStorageModalRoleLabels = Record<TStorageMemberRole, string>;
