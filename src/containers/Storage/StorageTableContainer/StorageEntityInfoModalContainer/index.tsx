import { FC } from "react";
import StorageEntityInfoModal from "@/components/Storage/StorageTable/StorageEntityInfoModal";
import { BitBoxTableInfoModalProps } from "@/containers/Common/BitBoxTableContainer/types";

const StorageEntityInfoModalContainer: FC<BitBoxTableInfoModalProps> = ({
  setConfig,
  ...props
}) => {
  const handleCloseModal = () => {
    setConfig({ open: false });
  };

  return (
    <StorageEntityInfoModal
      onCancel={handleCloseModal}
      onOk={handleCloseModal}
      {...props}
    />
  );
};

export default StorageEntityInfoModalContainer;
