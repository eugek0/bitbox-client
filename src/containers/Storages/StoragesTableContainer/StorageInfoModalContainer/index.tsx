import { FC } from "react";
import StorageInfoModal from "@/components/Storages/StoragesTable/StorageInfoModal";
import { BitBoxTableInfoModalProps } from "@/containers/Common/BitBoxTableContainer/types";
import { useGetUserQuery } from "@/core/api";

const StorageInfoModalContainer: FC<BitBoxTableInfoModalProps> = ({
  selected,
  config,
  setConfig,
  ...props
}) => {
  const { data: owner, isFetching: isOwnerFetching } = useGetUserQuery(
    { _id: selected?.owner },
    { skip: !selected?.owner || !config.open },
  );

  const handleCloseModal = () => {
    setConfig({ open: false });
  };

  return (
    <StorageInfoModal
      {...props}
      config={config}
      owner={owner}
      isOwnerFetching={isOwnerFetching}
      selected={selected}
      onCancel={handleCloseModal}
      onOk={handleCloseModal}
    />
  );
};

export default StorageInfoModalContainer;
