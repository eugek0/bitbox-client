import { TCreateStorageModalFields } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
import { ModalProps } from "antd";
import { Rule } from "antd/es/form";
import { FormInstance } from "antd/lib";

export interface CreateStorageModalProps
  extends Omit<ModalProps, "children" | "title" | "footer"> {
  form: FormInstance;
  loading: boolean;
  hide?: Partial<Record<keyof TCreateStorageModalFields, boolean>>;
}

export interface ICreateStorageModalRules
  extends Partial<Record<keyof TCreateStorageModalFields, Rule[]>> {
  default: Rule[];
}
