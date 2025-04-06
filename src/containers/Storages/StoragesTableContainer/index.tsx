import { FC } from "react";
import { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
  useEditStorageMutation,
  useGetStoragesQuery,
} from "../api";
import { STORAGES_TABLE_COLUMNS } from "./constants";
import { IStoragesTableRecord } from "./types";
import { IStorage } from "../types";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";
import { checkStorageAccess } from "./utils";
import StorageInfoModalContainer from "./StorageInfoModalContainer";

const StoragesTableContainer: FC = () => {
  const profile = useAppSelector(profileSelector);

  const navigate = useNavigate();

  const {
    data: storages,
    isFetching: isStoragesFetching,
    refetch: refetchStorages,
  } = useGetStoragesQuery();

  const [createStorage, { isLoading: isStorageCreating }] =
    useCreateStorageMutation();
  const [editStorage, { isLoading: isStorageEditing }] =
    useEditStorageMutation();
  const [deleteStorage] = useDeleteStorageMutation();

  const handleClickCreate: BitBoxTableButtonProps["onClick"] = ({
    setConfig,
  }) => {
    setConfig({
      open: true,
      mode: "add",
    });
  };

  const handleCreateRow = async (values: BitBoxTableRecord) => {
    await createStorage(values as TCreateStorageModalFields).unwrap();
    refetchStorages();
  };

  const handleEditRow = async (
    values: BitBoxTableRecord,
    record: BitBoxTableRecord,
  ) => {
    await editStorage({
      ...(record as IStorage),
      ...(values as IStorage),
    }).unwrap();
    refetchStorages();
  };

  const handleDeleteRow = async (selected: BitBoxTableRecord[]) => {
    await deleteStorage({ storages: selected.map((storage) => storage._id) });
    refetchStorages();
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
    setInfoModalConfig,
  }: BitBoxTableContextMenuDropdownProps): MenuProps => {
    const accessed =
      profile && checkStorageAccess(selected as IStorage[], profile);

    return {
      items: [
        {
          key: "1",
          type: "group",
          label: "Действия",
          children: [
            {
              key: "2",
              label: "Редактировать",
              icon: <EditOutlined />,
              disabled: selected.length > 1 || !accessed,
              onClick: () => {
                setModalConfig({ open: true, mode: "edit" });
                setContextMenuOpen(false);
              },
            },
            {
              key: "3",
              label: "Удалить",
              icon: <DeleteOutlined />,
              disabled: !accessed,
              onClick: () => {
                handleDeleteRow(selected);
                setContextMenuOpen(false);
              },
              danger: true,
            },
            {
              key: "4",
              type: "divider",
            },
            {
              key: "5",
              label: "Информация",
              disabled: selected.length > 1,
              icon: <InfoCircleOutlined />,
              onClick: () => {
                setInfoModalConfig({ open: true });
                setContextMenuOpen(false);
              },
            },
          ],
        },
      ],
    };
  };

  const borderMenu = ({
    setContextMenuOpen,
    setModalConfig,
  }: BitBoxTableContextMenuDropdownProps): MenuProps => ({
    items: [
      {
        key: "1",
        type: "group",
        label: "Действия",
      },
      {
        key: "2",
        label: "Создать хранилище",
        icon: <PlusOutlined />,
        onClick: () => {
          setModalConfig({ mode: "add", open: true });
          setContextMenuOpen(false);
        },
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
          isModalLoading={isStorageCreating || isStorageEditing}
          {...props}
        />
      )}
      infoModal={StorageInfoModalContainer}
      handleAddRow={handleCreateRow}
      handleEditRow={handleEditRow}
      loading={isStoragesFetching}
      onRow={onRow}
      borderContextMenu={{
        show: true,
        menu: borderMenu,
      }}
      contextMenu={{
        show: true,
        menu,
      }}
    />
  );
};

export default StoragesTableContainer;
