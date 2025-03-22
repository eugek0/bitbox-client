import { FC } from "react";
import { TableProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { MenuProps } from "antd/lib";
import { TCreateStorageModalFields } from "./CreateStorageModalContainer/types";
import BitBoxTableContainer from "@/containers/Common/BitBoxTableContainer";
import {
  BitBoxTableButtonProps,
  BitBoxTableContextMenuDropdownProps,
  BitBoxTableRecord,
} from "@/containers/Common/BitBoxTableContainer/types";
import CreateStorageModalContainer from "./CreateStorageModalContainer";
import {
  useCreateStorageMutation,
  useDeleteStorageMutation,
  useGetStoragesQuery,
} from "../api";
import { STORAGES_TABLE_COLUMNS } from "./constants";
import { IStoragesTableRecord } from "./types";

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

  const handleDeleteRow = async (selected: BitBoxTableRecord[]) => {
    await deleteStorage(selected[0]?._id);
  };

  const onRow: TableProps["onRow"] = (record) => ({
    onDoubleClick: (event) => {
      if (!event.shiftKey && !event.altKey) {
        navigate({ to: `/storage/${record._id}` });
      }
    },
  });

  const menu = ({
    selected,
    setContextMenuOpen,
    setModalConfig,
  }: BitBoxTableContextMenuDropdownProps): MenuProps => ({
    items: [
      {
        key: "1",
        type: "group",
        label: "Действия",
        children: [
          {
            key: "3",
            label: "Редактировать",
            icon: <EditOutlined />,
            disabled: selected?.length > 1,
            onClick: () => {
              setModalConfig({ open: true, mode: "edit" });
              setContextMenuOpen(false);
            },
          },
          {
            key: "2",
            label: "Удалить",
            icon: <DeleteOutlined />,
            onClick: () => {
              handleDeleteRow(selected);
              setContextMenuOpen(false);
            },
            danger: true,
          },
        ],
      },
    ],
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
      contextMenu={{
        show: true,
        menu,
      }}
    />
  );
};

export default StoragesTableContainer;
