import { BitBoxTableInfoModalProps } from "@/containers/Common/BitBoxTableContainer/types";
import { ModalProps } from "antd";

export type StorageEntityInfoModalProps = Pick<
  BitBoxTableInfoModalProps,
  "config" | "selected"
> &
  Pick<ModalProps, "onOk" | "onCancel">;
