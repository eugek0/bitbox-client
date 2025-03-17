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
import styles from "./styles.module.scss";
import { useNavigate } from "@tanstack/react-router";

const StoragesTableContainer: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

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
    className: styles["row"],
    onDoubleClick: () => {
      navigate({ to: `/storage/${record._id}` });
    },
    onContextMenu: async (event) => {
      event.preventDefault();
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
