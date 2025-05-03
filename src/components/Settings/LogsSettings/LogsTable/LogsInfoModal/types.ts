import { BitBoxTableInfoModalProps } from "@/containers/Common/BitBoxTableContainer/types";
import { IMethod } from "@/containers/Settings/LogsSettingsContainer/types";
import { ModalProps } from "antd";

export type LogsInfoModalProps = Pick<
  BitBoxTableInfoModalProps,
  "config" | "selected"
> &
  Pick<ModalProps, "onOk" | "onCancel"> & {
    methods: IMethod[];
  };
