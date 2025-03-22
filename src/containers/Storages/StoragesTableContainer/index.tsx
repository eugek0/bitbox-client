import { FC, useState } from "react";
import { TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { TCreateStorageModalFields } from "./CreateStorageModalContainer/types";
import BitBoxTableContainer from "@/containers/Common/BitBoxTableContainer";
import { BitBoxTableButtonProps } from "@/containers/Common/BitBoxTableContainer/types";
import CreateStorageModalContainer from "./CreateStorageModalContainer";
import {
  useCreateStorageMutation,
  useDeleteStorageMutation,
  useGetStoragesQuery,
} from "../api";
import { STORAGES_TABLE_COLUMNS } from "./constants";
import { IStoragesTableRecord } from "./types";
import styles from "./styles.module.scss";

const StoragesTableContainer: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

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
    className: `${styles["row"]} ${selected.includes(record._id) ? styles["row__selected"] : ""}`,
    onClick: (event) => {
      if (event.altKey) {
        if (selected.includes(record._id)) {
          setSelected(selected.filter((id) => id !== record._id));
        } else {
          setSelected([...selected, record._id]);
        }
      } else {
        setSelected([record._id]);
      }
    },
    onDoubleClick: (event) => {
      if (!event.shiftKey && !event.altKey) {
        navigate({ to: `/storage/${record._id}` });
      }
    },
    onContextMenu: async (event) => {
      event.preventDefault();
      await deleteStorage(record._id);
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
