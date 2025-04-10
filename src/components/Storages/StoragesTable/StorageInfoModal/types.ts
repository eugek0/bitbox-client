import { BitBoxTableInfoModalProps } from "@/containers/Common/BitBoxTableContainer/types";
import { ModalProps } from "antd";

export type StorageInfoModalProps = Omit<
  ModalProps,
  "children" | "title" | "footer" | "width" | "open"
> &
  Pick<BitBoxTableInfoModalProps, "selected" | "config">;
