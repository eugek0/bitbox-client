import { FC } from "react";
import {
  useCreateStorageMutation,
  useDeleteStorageMutation,
  useGetStoragesQuery,
} from "../api";
import { TCreateStorageModalFields } from "./CreateStorageModalContainer/types";
import { TableProps } from "antd";
import styles from "./styles.module.scss";
import { useNavigate } from "@tanstack/react-router";
import BitBoxTableContainer from "@/containers/BitBoxTableContainer";
import { IStoragesTableRecord } from "./types";
import { STORAGES_TABLE_COLUMNS } from "./constants";
import { BitBoxTableButtonProps } from "@/containers/BitBoxTableContainer/types";
import { PlusOutlined } from "@ant-design/icons";
import CreateStorageModalContainer from "./CreateStorageModalContainer";

const StoragesTableContainer: FC = () => {
  const navigate = useNavigate();

  const {
    data: storages,
    isFetching: isStoragesFetching,
    refetch: refetchStorages,
  } = useGetStoragesQuery();

  const [createStorage, { isLoading: isStorageCreating }] =
    useCreateStorageMutation();
  const [deleteStorage] = useDeleteStorageMutation();

  const handleClickCreate: BitBoxTableButtonProps["onClick"] = ({
    setConfig,
  }) => {
    setConfig({
      open: true,
      mode: "add",
    });
  };

  const handleCreateRow = async (values: Record<string, any>) => {
    await createStorage(values as TCreateStorageModalFields).unwrap();
    refetchStorages();
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
    <BitBoxTableContainer<IStoragesTableRecord>
      records={storages ?? []}
      columns={STORAGES_TABLE_COLUMNS}
      header={{
        title: "Список хранилищ",
        button: {
          children: "Создать",
          onClick: handleClickCreate,
          icon: <PlusOutlined />,
        },
      }}
      modal={(props) => (
        <CreateStorageModalContainer
          isModalLoading={isStorageCreating}
          {...props}
        />
      )}
      handleAddRow={handleCreateRow}
      loading={isStoragesFetching}
      onRow={onRow}
    />
  );
};

export default StoragesTableContainer;
