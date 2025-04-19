import { BitBoxTableModalProps } from "@/containers/Common/BitBoxTableContainer/types";
import { TCreateStoragePayload } from "../../types";
import { Rule } from "antd/es/form";

export interface CreateStorageModalContainerProps
  extends BitBoxTableModalProps {
  isModalLoading: boolean;
}

export type TCreateStorageModalFields = TCreateStoragePayload;

export interface ICreateStorageModalRules
  extends Partial<Record<keyof TCreateStorageModalFields, Rule[]>> {
  default: Rule[];
}
