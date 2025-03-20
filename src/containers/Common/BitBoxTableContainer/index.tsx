import { ReactNode, useState } from "react";
import BitBoxTable from "@/components/Common/BitBoxTable";
import {
  BitBoxTableContainerProps,
  BitBoxTableModalProps,
  BitBoxTableRecord,
  IBitBoxTableModalConfig,
} from "./types";

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
