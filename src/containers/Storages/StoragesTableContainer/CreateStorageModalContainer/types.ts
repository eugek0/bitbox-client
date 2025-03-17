import { BitBoxTableModalProps } from "@/containers/BitBoxTableContainer/types";
import { ICreateStoragePayload } from "../../types";

export interface CreateStorageModalContainerProps
  extends BitBoxTableModalProps {
  isModalLoading: boolean;
}

export type TCreateStorageModalFields = ICreateStoragePayload;
