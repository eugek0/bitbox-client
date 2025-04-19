import {
  DragEventHandler,
  FC,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
  EditOutlined,
  FolderAddOutlined,
  InfoCircleOutlined,
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
  usePasteEntitiesMutation,
  useRenameEntityMutation,
} from "../api";
import { STORAGE_TABLE_COLUMNS } from "./constants";
import CreateDirectoryModalContainer from "./CreateDirectoryModalContainer";
import {
  BitBoxTableContextMenuDropdownProps,
  BitBoxTableRecord,
  IBitBoxTableInfoModalConfig,
} from "@/containers/Common/BitBoxTableContainer/types";
import { useAppSelector } from "@/store";
import { storageBufferSelector } from "../selectors";
import { IEntity } from "../types";
import { setStorageBuffer } from "../slice";
import { download, getNoun } from "@/core/utils";
import { v4 } from "uuid";
import { appAxios } from "@/core/axios";
import { isAxiosError } from "axios";
import styles from "./styles.module.scss";
import StorageEntityInfoModalContainer from "./StorageEntityInfoModalContainer";
import { SERVER_BASE_URL } from "@/core/constants";
import RenameEntityModalContainer from "./RenameEntityModalContainer";
import { useStorageRole } from "./hooks/useStorageRole";
import StorageInfoModalContainer from "@/containers/Storages/StoragesTableContainer/StorageInfoModalContainer";

const StorageTableContainer: FC = () => {
  const [isCreateDirectoryModalOpen, setIsCreateDirectoryModalOpen] =
    useState<boolean>(false);
  const [isRenameEntityModalOpen, setIsRenameEntityModalOpen] =
    useState<boolean>(false);
  const [selected, setSelected] = useState<IEntity[]>([]);
  const [infoModalConfig, setInfoModalConfig] =
    useState<IBitBoxTableInfoModalConfig>({
      open: false,
    });

  const { storageid } = useParams({ from: "/storage/$storageid/" });
  const { parent } = useSearch({ from: "/storage/$storageid/" });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const context = useContext(StorageContext);
  const buffer = useAppSelector(storageBufferSelector);
  const role = useStorageRole(context?.members ?? [], context?.defaultRole);

  const { data: entities, refetch: refetchEntities } =
    useGetStorageEntitiesQuery({
      storageid,
      params: { parent },
    });
  const [createDirectory] = useCreateDirectoryMutation();
  const [deleteEntities] = useDeleteEntitiesMutation();
  const [pasteEntities] = usePasteEntitiesMutation();
  const [renameEntity] = useRenameEntityMutation();

  const { notification, modal, message } = App.useApp();

  if (!context) {
    throw new Error("Context not found");
  }

  const { name } = context;

  const handleDrop: DragEventHandler<HTMLDivElement> = async (event) => {
    event.preventDefault();
    const items = event.dataTransfer.items;

    const allFiles = new DataTransfer();

    const traverseFileTree = async (item: any, path = ""): Promise<void> => {
      return new Promise((resolve) => {
        if (item.isFile) {
          item.file((file: File) => {
            const fileWithPath = new File([file], path + file.name, {
              type: file.type,
            });
            allFiles.items.add(fileWithPath);
            resolve();
          });
        } else if (item.isDirectory) {
          const dirReader = item.createReader();
          dirReader.readEntries(async (entries: any[]) => {
            for (const entry of entries) {
              await traverseFileTree(entry, path + item.name + "/");
            }
            resolve();
          });
        }
      });
    };

    const entries = Array.from(items)
      .map((item) => item.webkitGetAsEntry())
      .filter(Boolean);

    for (const entry of entries) {
      await traverseFileTree(entry);
    }

    await handleUploadFiles(allFiles.files, true);
    refetchEntities();
  };

  const handlePasteEntities = useCallback(async () => {
    if (buffer.type) {
      try {
        message.open({
          content: "Вставка сущностей",
          key: "paste",
          type: "loading",
        });
        await pasteEntities({
          storageid,
          body: {
            entities: buffer.items.map((entity) => entity._id),
            target: parent ?? null,
            type: buffer.type,
          },
        });
        refetchEntities();
        message.open({ content: "Успешно", key: "paste", type: "success" });
      } catch {
        message.open({ content: "Ошибка", key: "paste", type: "error" });
      }
    }
  }, [buffer, storageid, parent]);

  const handleSelect = (selected: BitBoxTableRecord[]) => {
    setSelected(selected as IEntity[]);
  };

  const handleOpenCreateDirectoryModal = () => {
    setIsCreateDirectoryModalOpen(true);
  };

  const handleCloseCreateDirectoryModal = () => {
    setIsCreateDirectoryModalOpen(false);
  };

  const handleOpenRenameEntityModal = () => {
    setIsRenameEntityModalOpen(true);
  };

  const handleCloseRenameEntityModal = () => {
    setIsRenameEntityModalOpen(false);
  };

  const handleDownloadEntities = async (selected: IEntity[]) => {
    await appAxios.get("/auth/refresh");
    const response = await fetch(
      `${SERVER_BASE_URL}/entities/blob/${storageid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entities: selected.map((entity) => entity._id),
        }),
        credentials: "include",
      },
    );

    const size = response.headers.get("Content-Length");

    download(
      response,
      selected.length > 1 ||
        (selected.length === 1 && selected[0].type === "directory")
        ? "entities.zip"
        : selected[0].fullname,
      +(size ?? 0) || undefined,
    );
  };

  const handleUploadFiles = async (
    files: FileList | null,
    directory: boolean,
  ) => {
    const formdata = new FormData();

    formdata.append("parent", parent);
    for (const file of files ?? []) {
      formdata.append(
        "entities",
        file,
        directory ? file.webkitRelativePath || file.name : undefined,
      );
      if (directory) {
        formdata.append("metadata", file.webkitRelativePath || file.name);
      }
    }
    const uploadKey = v4();

    const message = `Загрузка ${files?.length ?? 0} ${getNoun(files?.length ?? 0, "файла", "файлов", "файлов")}`;

    const controller = new AbortController();

    const handleCancelUpload = async () => {
      const result = await modal.confirm({
        title: "Отменить загрузку?",
        content: `${(files?.length ?? 0) > 1 ? "Файлы" : "Файл"} еще не ${(files?.length ?? 0) > 1 ? "загружены" : "загружен"}. Отменить?`,
      });

      if (result) {
        controller.abort();
      }
    };

    try {
      await appAxios.get("auth/refresh");
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
                  <Spin indicator={<LoadingOutlined />} size="small" spinning />
                </Flex>
              ) : (
                <Progress size="small" percent={progress} />
              ),
            placement: "bottomRight",
            closable: false,
            duration: 0,
            message: (
              <Flex justify="space-between" align="center">
                <span>{message}</span>
                <Button
                  onClick={handleCancelUpload}
                  icon={<CloseOutlined />}
                  iconPosition="end"
                  type="text"
                  size="small"
                  danger
                >
                  Отменить
                </Button>
              </Flex>
            ),
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
      if (isAxiosError(error) && [400, 500].includes(error.status ?? 0)) {
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
  };

  const handleChooseFiles = (directory: boolean) => {
    const upload = document.createElement("input");
    upload.setAttribute("type", "file");
    upload.setAttribute("multiple", "");
    if (directory) {
      upload.setAttribute("webkitdirectory", "");
    }

    const changeEventHandler = async () => {
      await handleUploadFiles(upload?.files, directory);
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
  };

  const handleOkRenameEntityModal = async ({
    fullname,
  }: Record<string, any>) => {
    await renameEntity({
      storageid,
      body: {
        entity: selected[0]._id,
        fullname,
      },
    });
    refetchEntities();
  };

  const handleClickBack = () => {
    navigate({ to: "/" });
  };

  const handleCopyEntities = (selected: IEntity[]) => {
    if (selected.length) {
      message.info({
        content: `${getNoun(selected.length, "Скопирована", "Скопированы", "Скопировано")} ${selected.length} ${getNoun(selected.length, "сущность", "сущности", "сущностей")}`,
        duration: 0.75,
      });
      dispatch(
        setStorageBuffer({
          items: selected,
          type: "copy",
        }),
      );
    }
  };

  const handleCutEntities = (selected: IEntity[]) => {
    if (selected.length) {
      message.info({
        content: `${getNoun(selected.length, "Вырезана", "Вырезаны", "Вырезано")} ${selected.length} ${getNoun(selected.length, "сущность", "сущности", "сущностей")}`,
        duration: 0.75,
      });
      dispatch(
        setStorageBuffer({
          items: selected,
          type: "cut",
        }),
      );
    }
  };

  const onRow: TableProps["onRow"] = (record) => ({
    onDoubleClick: () => {
      if (record.type === "file") {
        navigate({ to: `/storage/${storageid}/entity/${record._id}` });
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
          <ProductFilled className={styles["icon"]} />
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
    setInfoModalConfig,
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
              handleDownloadEntities(selected as IEntity[]);
              setContextMenuOpen(false);
            },
          },
          {
            key: "3",
            label: "Переименовать",
            icon: <EditOutlined />,
            disabled: role === "watcher" || selected.length > 1,
            onClick: () => {
              handleOpenRenameEntityModal();
              setContextMenuOpen(false);
            },
          },
          {
            key: "4",
            type: "divider",
          },
          {
            key: "5",
            label: "Скопировать",
            disabled: role === "watcher",
            icon: <CopyOutlined />,
            onClick: () => {
              handleCopyEntities(selected as IEntity[]);
              setSelected([]);
              setContextMenuOpen(false);
            },
          },
          {
            key: "6",
            label: "Вырезать",
            disabled: role === "watcher",
            icon: <IoCutOutline />,
            onClick: () => {
              handleCutEntities(selected as IEntity[]);
              setSelected([]);
              setContextMenuOpen(false);
            },
          },
          {
            key: "7",
            type: "divider",
          },
          {
            key: "8",
            label: "Удалить",
            disabled: role === "watcher",
            icon: <DeleteOutlined />,
            onClick: () => {
              handleDeleteEntities(selected as IEntity[]);
              setContextMenuOpen(false);
            },
            danger: true,
          },
          {
            key: "9",
            type: "divider",
          },
          {
            key: "10",
            label: "Информация",
            icon: <InfoCircleOutlined />,
            onClick: () => {
              setInfoModalConfig({ open: true });
              setContextMenuOpen(false);
            },
          },
        ],
      },
    ],
  });

  const borderMenu = ({
    setContextMenuOpen,
    setSelected,
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
            disabled: role === "watcher",
            icon: <FolderAddOutlined />,
            onClick: () => {
              handleOpenCreateDirectoryModal();
              setContextMenuOpen(false);
            },
          },
          {
            key: "3",
            type: "divider",
          },
          {
            key: "4",
            label: "Загрузить файлы",
            disabled: role === "watcher",
            icon: <LuFileUp />,
            onClick: () => {
              handleChooseFiles(false);
              setContextMenuOpen(false);
            },
          },
          {
            key: "5",
            label: "Загрузить директорию",
            disabled: role === "watcher",
            icon: <LuFolderUp />,
            onClick: () => {
              handleChooseFiles(true);
              setContextMenuOpen(false);
            },
          },
          {
            key: "6",
            type: "divider",
          },
          {
            key: "7",
            label: "Вставить",
            icon: <PlusOutlined />,
            disabled: role === "watcher" || !buffer.items.length,
            onClick: async () => {
              handlePasteEntities();
              setContextMenuOpen(false);
              setSelected([]);
            },
          },
          {
            key: "8",
            type: "divider",
          },
          {
            key: "9",
            label: "Информация",
            icon: <InfoCircleOutlined />,
            onClick: async () => {
              setInfoModalConfig({ open: true });
              setContextMenuOpen(false);
            },
          },
        ],
      },
    ],
  });

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        switch (event.code) {
          case "KeyC":
            handleCopyEntities(selected);
            break;
          case "KeyX":
            handleCutEntities(selected);
            break;
          case "KeyV":
            handlePasteEntities();
            break;
        }
      }

      switch (event.code) {
        case "F2":
          if (selected.length === 1) {
            handleOpenRenameEntityModal();
          }
          break;
        case "Delete":
          handleDeleteEntities(selected);
          break;
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handlePasteEntities, selected]);

  return (
    <>
      <BitBoxTableContainer<IEntity>
        records={entities?.items ?? []}
        columns={STORAGE_TABLE_COLUMNS}
        loading={false}
        onRow={onRow}
        breadcrumbs={breadcrumbs}
        handleDrop={handleDrop}
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
                    type: "divider",
                  },
                  {
                    key: "3",
                    label: "Загрузить файлы",
                    onClick: () => handleChooseFiles(false),
                    icon: <LuFileUp />,
                  },
                  {
                    key: "4",
                    label: "Загрузить директорию",
                    onClick: () => handleChooseFiles(true),
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
              К списку
            </Button>
          ),
        }}
        infoModal={StorageEntityInfoModalContainer}
        handleSelect={handleSelect}
        withDrop
      />
      <CreateDirectoryModalContainer
        open={isCreateDirectoryModalOpen}
        handleCloseModal={handleCloseCreateDirectoryModal}
        handleOkModal={handleOkCreateDirectoryModal}
      />
      <RenameEntityModalContainer
        open={isRenameEntityModalOpen}
        selected={selected[0]}
        handleCloseModal={handleCloseRenameEntityModal}
        handleOkModal={handleOkRenameEntityModal}
      />
      <StorageInfoModalContainer
        config={infoModalConfig}
        setConfig={setInfoModalConfig}
        selected={context}
      />
    </>
  );
};

export default StorageTableContainer;
