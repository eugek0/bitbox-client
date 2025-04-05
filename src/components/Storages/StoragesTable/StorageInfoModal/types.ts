import { IProfile } from "@/containers/Auth/types";
import {
  BitBoxTableRecord,
  IBitBoxTableInfoModalConfig,
} from "@/containers/Common/BitBoxTableContainer/types";
import { ModalProps } from "antd";

export interface StorageInfoModalProps
  extends Omit<ModalProps, "children" | "title" | "footer" | "width" | "open"> {
  config: IBitBoxTableInfoModalConfig;
  selected: BitBoxTableRecord;
  owner: IProfile | undefined;
  isOwnerFetching: boolean;
}
