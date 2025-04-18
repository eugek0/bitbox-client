import { RenameEntityModalContainerProps } from "@/containers/Storage/StorageTableContainer/RenameEntityModalContainer/types";
import { FormInstance, ModalProps } from "antd";

export type RenameEntityModalProps = Omit<ModalProps, "title" | "width"> &
  Pick<RenameEntityModalContainerProps, "selected" | "loading"> & {
    form: FormInstance;
  };
