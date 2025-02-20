import { FC, useState } from "react";
import StoragesTable from "@/components/Storages/StoragesTable";
import {
  useCreateStorageMutation,
  useDeleteStorageMutation,
  useGetStoragesQuery,
} from "../api";
import { TCreateStorageModalFields } from "./CreateStorageModalContainer/types";
import StorageTableContext from "./context";
import { TableProps } from "antd";

const StoragesTableContainer: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const {
    data: storages,
    isFetching: isStoragesFetching,
    refetch: refetchStorages,
  } = useGetStoragesQuery();

  const [createStorage, { isLoading: isStorageCreating }] =
    useCreateStorageMutation();
  const [deleteStorage] = useDeleteStorageMutation();

  const handleClickCreate = () => {
    setModalOpen(true);
  };

  const handleOkModal = async (values: TCreateStorageModalFields) => {
    await createStorage(values).unwrap();
    refetchStorages();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const onRow: TableProps["onRow"] = (record) => ({
    onDoubleClick: async () => {
      await deleteStorage(record.name);
      refetchStorages();
    },
  });

  return (
    <StorageTableContext
      value={{
        isModalOpen,
        isModalLoading: isStorageCreating,
        handleCloseModal,
        handleOkModal,
      }}
    >
      <StoragesTable
        storages={storages ?? []}
        loading={isStoragesFetching}
        handleClickCreate={handleClickCreate}
        onRow={onRow}
      />
    </StorageTableContext>
  );
};

export default StoragesTableContainer;
