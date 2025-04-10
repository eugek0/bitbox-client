import { FC } from "react";
import StorageInfoModal from "@/components/Storages/StoragesTable/StorageInfoModal";
import { BitBoxTableInfoModalProps } from "@/containers/Common/BitBoxTableContainer/types";

const StorageInfoModalContainer: FC<BitBoxTableInfoModalProps> = ({
  selected,
  config,
  setConfig,
  ...props
}) => {
  const handleCloseModal = () => {
    setConfig({ open: false });
  };

  return (
    <StorageInfoModal
      {...props}
      config={config}
      selected={selected}
      onCancel={handleCloseModal}
      onOk={handleCloseModal}
    />
  );
};

export default StorageInfoModalContainer;
