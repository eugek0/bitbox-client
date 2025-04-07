import { FC, MouseEvent, useContext, useState } from "react";
import {
  App,
  BreadcrumbProps,
  Button,
  Dropdown,
  Flex,
  MenuProps,
  Progress,
  Spin,
} from "antd";
import { LuFileUp, LuFolderUp } from "react-icons/lu";
import { IoCutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FolderAddOutlined,
  LoadingOutlined,
  PlusOutlined,
  ProductFilled,
} from "@ant-design/icons";
import { TableProps } from "antd/lib";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import BitBoxTableContainer from "@/containers/Common/BitBoxTableContainer";
import { StorageContext } from "../../Layouts/StorageLayoutContainer/context";
import {
  useCreateDirectoryMutation,
  useDeleteEntitiesMutation,
  useGetStorageEntitiesQuery,
  useLazyGetStorageFileQuery,
} from "../api";
import { STORAGE_TABLE_COLUMNS } from "./constants";
import CreateDirectoryModalContainer from "./CreateDirectoryModalContainer";
import { BitBoxTableContextMenuDropdownProps } from "@/containers/Common/BitBoxTableContainer/types";
import { useAppSelector } from "@/store";
import { storageBufferSelector } from "../selectors";
import { IEntity } from "../types";
import { clearStorageBuffer, setStorageBuffer } from "../slice";
import { downloadBlob, getNoun } from "@/core/utils";
import { v4 } from "uuid";
import { appAxios } from "@/core/axios";
import { isAxiosError } from "axios";
import styles from "./styles.module.scss";

const StorageTableContainer: FC = () => {
  const [isCreateDirectoryModalOpen, setIsCreateDirectoryModalOpen] =
    useState<boolean>(false);
  const { storageid } = useParams({ from: "/storage/$storageid/" });
  const { parent } = useSearch({ from: "/storage/$storageid/" });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const context = useContext(StorageContext);
  const buffer = useAppSelector(storageBufferSelector);

  const { data: entities, refetch: refetchEntities } =
    useGetStorageEntitiesQuery({
      storageid,
      params: { parent },
    });
  const [createDirectory] = useCreateDirectoryMutation();
  const [deleteEntities] = useDeleteEntitiesMutation();
  const [downloadEntity] = useLazyGetStorageFileQuery();

  const { notification, modal } = App.useApp();

  if (!context) {
    throw new Error("Context not found");
  }

  const { name } = context;

  const handleOpenCreateDirectoryModal = () => {
    setIsCreateDirectoryModalOpen(true);
  };

  const handleCloseCreateDirectoryModal = () => {
    setIsCreateDirectoryModalOpen(false);
  };

  const handleDownloadEntities = async (entity: IEntity) => {
    const blob = await downloadEntity({
      fileid: entity._id,
      storageid,
    }).unwrap();
    downloadBlob(blob, entity.fullname);
  };

  const handleUploadEntities = (directory: boolean) => {
    const upload = document.createElement("input");
    upload.setAttribute("type", "file");
    upload.setAttribute("multiple", "");
    if (directory) {
      upload.setAttribute("webkitdirectory", "");
    }

    const changeEventHandler = async () => {
      const formdata = new FormData();

      formdata.append("parent", parent);
      for (const file of upload?.files ?? []) {
        formdata.append(
          "entities",
          file,
          directory ? file.webkitRelativePath : undefined,
        );
        if (directory) {
          formdata.append("metadata", file.webkitRelativePath);
        }
      }
      const uploadKey = v4();

      const message = `Загрузка ${upload?.files?.length ?? 0} ${getNoun(upload?.files?.length ?? 0, "файла", "файлов", "файлов")}`;

      const controller = new AbortController();

      const handleCancelUpload = async () => {
        const result = await modal.confirm({
          title: "Отменить загрузку?",
          content: `${(upload?.files?.length ?? 0) > 1 ? "Файлы" : "Файл"} еще не ${(upload?.files?.length ?? 0) > 1 ? "загружены" : "загружен"}. Отменить?`,
        });

        if (result) {
          controller.abort();
        }
      };

      try {
        await appAxios.post(`/entities/${storageid}`, formdata, {
          signal: controller.signal,
          onUploadProgress: (event) => {
            const progress = Math.round((event.progress ?? 0) * 100);
            notification.open({
              key: uploadKey,
              type: "info",
              description:
                progress === 100 ? (
                  <Flex gap={10} align="center">
                    <span>Запись файлов на диск</span>
                    <Spin
                      indicator={<LoadingOutlined />}
                      size="small"
                      spinning
                    />
                  </Flex>
                ) : (
                  <Progress size="small" percent={progress} />
                ),
              actions: (
                <Button
                  onClick={handleCancelUpload}
                  icon={<CloseOutlined />}
                  type="text"
                  danger
                >
                  Отменить
                </Button>
              ),
              placement: "bottomRight",
              closable: false,
              duration: 0,
              message,
            });
          },
        });
        notification.open({
          key: uploadKey,
          type: "info",
          description: (
            <Flex gap={10} align="center">
              <span>Запись файлов на диск</span>
              <CheckOutlined className={styles["check"]} />
            </Flex>
          ),
          placement: "bottomRight",
          duration: 5,
          message,
        });
      } catch (error) {
        if (isAxiosError(error) && error.status === 400) {
          notification.open({
            key: uploadKey,
            type: "error",
            duration: 5,
            message: "Ошибка",
            placement: "bottomRight",
            description: error?.response?.data.message,
          });
        } else if (isAxiosError(error) && error.code === "ERR_CANCELED") {
          notification.open({
            key: uploadKey,
            type: "warning",
            duration: 5,
            placement: "bottomRight",
            description: "Загрузка была отменена",
            message,
          });
        } else {
          throw error;
        }
      }
      upload.removeEventListener("change", changeEventHandler);
      refetchEntities();
    };

    upload.addEventListener("change", changeEventHandler);
    upload.click();
  };

  const handleDeleteEntities = async (selected: IEntity[]) => {
    await deleteEntities({
      storageid,
      body: {
        entities: selected.map((entity) => entity._id),
      },
    });
    refetchEntities();
  };

  const handleOkCreateDirectoryModal = async (values: Record<string, any>) => {
    await createDirectory({
      storageid,
      body: {
        name: values.name,
        parent,
      },
    });
    refetchEntities();
    handleCloseCreateDirectoryModal();
  };

  const handleClickBack = () => {
    navigate({ to: "/" });
  };

  const handleCopyEntities = (selected: IEntity[]) => {
    dispatch(
      setStorageBuffer({
        items: selected,
        type: "copy",
      }),
    );
  };

  const handleCutEntities = (selected: IEntity[]) => {
    dispatch(
      setStorageBuffer({
        items: selected,
        type: "cut",
      }),
    );
  };

  const handleClearBuffer = () => {
    dispatch(clearStorageBuffer());
  };

  const onRow: TableProps["onRow"] = (record) => ({
    onDoubleClick: () => {
      if (record.type === "file") {
        navigate({ to: `/storage/${storageid}/file/${record._id}` });
      } else if (record.type === "directory") {
        navigate({
          to: `/storage/${storageid}`,
          search: { parent: record._id },
        });
      }
    },
  });

  const breadcrumbs: BreadcrumbProps["items"] = [
    {
      key: "storage",
      title: (
        <Flex gap={5} align="center">
          <ProductFilled />
          <span>{name}</span>
        </Flex>
      ),
      onClick: (event) => {
        event.preventDefault();
        navigate({ to: `/storage/${storageid}` });
      },
      href: "",
    },
    ...(entities?.breadcrumbs?.map?.((breadcrumb) => ({
      key: breadcrumb._id,
      title: breadcrumb.fullname,
      onClick: (event: MouseEvent) => {
        event.preventDefault();
        navigate({
          to: `/storage/${storageid}`,
          search: {
            parent: breadcrumb._id,
          },
        });
      },
      href: "",
    })) ?? []),
  ];

  const menu = ({
    selected,
    setSelected,
    setContextMenuOpen,
  }: BitBoxTableContextMenuDropdownProps): MenuProps => ({
    items: [
      {
        key: "1",
        type: "group",
        label: "Действия",
        children: [
          {
            key: "2",
            label: "Скачать",
            icon: <DownloadOutlined />,
            onClick: () => {
              handleDownloadEntities(selected[0] as IEntity);
              setContextMenuOpen(false);
            },
          },
          {
            key: "3",
            type: "divider",
          },
          {
            key: "4",
            label: "Скопировать",
            icon: <CopyOutlined />,
            onClick: () => {
              handleCopyEntities(selected as IEntity[]);
              setSelected([]);
              setContextMenuOpen(false);
            },
          },
          {
            key: "5",
            label: "Вырезать",
            icon: <IoCutOutline />,
            onClick: () => {
              handleCutEntities(selected as IEntity[]);
              setSelected([]);
              setContextMenuOpen(false);
            },
          },
          {
            key: "6",
            type: "divider",
          },
          {
            key: "7",
            label: "Удалить",
            icon: <DeleteOutlined />,
            onClick: () => {
              handleDeleteEntities(selected as IEntity[]);
              setContextMenuOpen(false);
            },
            danger: true,
          },
        ],
      },
    ],
  });

  const borderMenu = ({
    setContextMenuOpen,
  }: BitBoxTableContextMenuDropdownProps): MenuProps => ({
    items: [
      {
        key: "1",
        type: "group",
        label: "Действия",
        children: [
          {
            key: "2",
            label: "Создать директорию",
            icon: <FolderAddOutlined />,
            onClick: () => {
              handleOpenCreateDirectoryModal();
              setContextMenuOpen(false);
            },
          },
          {
            key: "3",
            label: "Загрузить файлы",
            icon: <LuFileUp />,
            onClick: () => {
              handleUploadEntities(false);
              setContextMenuOpen(false);
            },
          },
          {
            key: "4",
            label: "Загрузить директорию",
            icon: <LuFolderUp />,
            onClick: () => {
              handleUploadEntities(true);
              setContextMenuOpen(false);
            },
          },
          {
            key: "5",
            type: "divider",
          },
          {
            key: "6",
            label: "Вставить",
            icon: <PlusOutlined />,
            disabled: !buffer.items.length,
            onClick: () => {
              handleClearBuffer();
              setContextMenuOpen(false);
            },
          },
        ],
      },
    ],
  });

  return (
    <>
      <BitBoxTableContainer<IEntity>
        records={entities?.items ?? []}
        columns={STORAGE_TABLE_COLUMNS}
        loading={false}
        onRow={onRow}
        breadcrumbs={breadcrumbs}
        borderContextMenu={{
          show: true,
          menu: borderMenu,
        }}
        contextMenu={{
          show: true,
          menu,
        }}
        header={{
          title: name,
          suffix: (
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "1",
                    label: "Создать директорию",
                    onClick: handleOpenCreateDirectoryModal,
                    icon: <FolderAddOutlined />,
                  },
                  {
                    key: "2",
                    label: "Загрузить файлы",
                    onClick: () => handleUploadEntities(false),
                    icon: <LuFileUp />,
                  },
                  {
                    key: "3",
                    label: "Загрузить директорию",
                    onClick: () => handleUploadEntities(true),
                    icon: <LuFolderUp />,
                  },
                ],
              }}
            >
              <Button type="primary" icon={<PlusOutlined />}>
                Создать
              </Button>
            </Dropdown>
          ),
          prefix: (
            <Button
              onClick={handleClickBack}
              icon={<ArrowLeftOutlined />}
              type="text"
            >
              Назад
            </Button>
          ),
        }}
      />
      <CreateDirectoryModalContainer
        open={isCreateDirectoryModalOpen}
        handleCloseModal={handleCloseCreateDirectoryModal}
        handleOkModal={handleOkCreateDirectoryModal}
      />
    </>
  );
};

export default StorageTableContainer;
