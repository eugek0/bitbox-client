import { RenameEntityModalContainerProps } from "@/containers/Storage/StorageTableContainer/RenameEntityModalContainer/types";
import { FormInstance, InputRef, ModalProps } from "antd";
import { KeyboardEventHandler, Ref } from "react";

export type RenameEntityModalProps = Omit<ModalProps, "title" | "width"> &
  Pick<RenameEntityModalContainerProps, "selected"> & {
    form: FormInstance;
    fullnameRef?: Ref<InputRef>;
    handleKeyDown?: KeyboardEventHandler<HTMLFormElement>;
  };
