import { BitBoxTableModalProps } from "@/containers/Common/BitBoxTableContainer/types";
import { ICreateStoragePayload } from "../../types";

export interface CreateStorageModalContainerProps
  extends BitBoxTableModalProps {
  isModalLoading: boolean;
}

export type TCreateStorageModalFields = ICreateStoragePayload;
