import { ReactNode, useState } from "react";
import {
  BitBoxTableContainerProps,
  BitBoxTableModalProps,
  BitBoxTableRecord,
  IBitBoxTableModalConfig,
} from "./types";
import BitBoxTable from "@/components/BitBoxTable";

const BitBoxTableContainer = <T extends BitBoxTableRecord>({
  handleAddRow,
  ...props
}: BitBoxTableContainerProps<T>): ReactNode => {
  const [modalConfig, setModalConfig] = useState<IBitBoxTableModalConfig>({
    open: false,
    mode: null,
  });

  const modalProps: BitBoxTableModalProps = {
    config: modalConfig,
    setConfig: setModalConfig,
    handleAddRow,
  };

  return <BitBoxTable modalProps={modalProps} {...props} />;
};

export default BitBoxTableContainer;
