import {
  BitBoxTableRecord,
  IBitBoxTableModalConfig,
} from "@/containers/Common/BitBoxTableContainer/types";
import {
  ICreateStorageModalRules,
  TCreateStorageModalFields,
} from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
import { TStorageMemberRole } from "@/containers/Storages/types";
import { ModalProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { FormInstance } from "antd/lib";

export interface CreateStorageModalProps
  extends Omit<ModalProps, "children" | "title" | "footer"> {
  config: IBitBoxTableModalConfig;
  form: FormInstance;
  loading: boolean;
  disabled?: Partial<Record<keyof TCreateStorageModalFields, boolean>>;
  required?: Partial<Record<keyof TCreateStorageModalFields, boolean>>;
  rules: ICreateStorageModalRules;
  initialValues?: BitBoxTableRecord;
}

export type TCreateStorageModalOptions = Partial<
  Record<keyof TCreateStorageModalFields, DefaultOptionType[]>
>;

export type TCreateStorageModalRoleLabels = Record<TStorageMemberRole, string>;
