import { BitBoxTableModalProps } from "@/containers/Common/BitBoxTableContainer/types";
import { TCreateStoragePayload } from "../../types";

export interface CreateStorageModalContainerProps
  extends BitBoxTableModalProps {
  isModalLoading: boolean;
}

export type TCreateStorageModalFields = TCreateStoragePayload;
