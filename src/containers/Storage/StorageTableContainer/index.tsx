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
  Pagination,
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
import { appAxios } from "@/core/axios";
import { isAxiosError } from "axios";
import styles from "./styles.module.scss";
import StorageEntityInfoModalContainer from "./StorageEntityInfoModalContainer";
import { SERVER_BASE_URL } from "@/core/constants";
import RenameEntityModalContainer from "./RenameEntityModalContainer";
import { useStorageRole } from "./hooks/useStorageRole";
import StorageInfoModalContainer from "@/containers/Storages/StoragesTableContainer/StorageInfoModalContainer";
import { createPortal } from "react-dom";
import EntityDownloadContainer from "../EntityDownloadContainer";
import { v4 } from "uuid";

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

  const { storageid } = useParams({
    from: "/_layout/storage/_layout/$storageid",
  });
  const { parent, entityid, page, limit } = useSearch({
    from: "/_layout/storage/_layout/$storageid",
  });
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    {
      page,
      limit: limit ?? 15,
    },
  );

  const dispatch = useDispatch();

  const context = useContext(StorageContext);
  const buffer = useAppSelector(storageBufferSelector);
  const role = useStorageRole(context);

  const {
    data: entities,
    isFetching: isEntitiesFetching,
    refetch: refetchEntities,
  } = useGetStorageEntitiesQuery({
    storageid,
    params: { parent, page, limit },
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

    const BATCH = 5;

    const collectFiles = async (items: DataTransferItemList) => {
      const result: File[] = [];

      const traverse = async (entry: any, path = ""): Promise<void> =>
        new Promise((res) => {
          if (entry.isFile) {
            entry.file((file: File) => {
              Object.defineProperty(file, "webkitRelativePath", {
                value: path + file.name,
              });
              result.push(file);
              res();
            });
          } else if (entry.isDirectory) {
            const reader = entry.createReader();
            reader.readEntries(async (entries: any[]) => {
              for (const e of entries)
                await traverse(e, path + entry.name + "/");
              res();
            });
          }
        });

      const roots = Array.from(items)
        .map((i) => i.webkitGetAsEntry())
        .filter(Boolean);

      for (const root of roots) await traverse(root);
      return result;
    };

    const allFiles = await collectFiles(event.dataTransfer.items);

    const uploadKey = v4();
    let breaked = false;

    const handleCancelUpload = async (controller: AbortController) => {
      const result = await modal.confirm({
        title: "Отменить загрузку?",
        content: `${allFiles.length > 1 ? "Файлы" : "Файл"} еще не ${
          allFiles.length > 1 ? "загружены" : "загружен"
        }. Отменить?`,
      });
      if (result) {
        controller.abort();
        breaked = true;
      }
    };

    for (let i = 0; i < allFiles.length; i += BATCH) {
      if (breaked) break;

      const slice = allFiles.slice(i, i + BATCH);
      const fd = new FormData();
      slice.forEach((file) => {
        fd.append("entities", file, file.name);
        fd.append("metadata", (file as any).webkitRelativePath || file.name);
      });

      const controller = new AbortController();

      await handleUploadFiles({
        formdata: fd,
        uploading: slice.length,
        uploaded: i,
        total: allFiles.length,
        uploadKey,
        controller,
        handleCancelUpload: () => handleCancelUpload(controller),
      });
    }

    if (!breaked) {
      notification.open({
        key: uploadKey,
        type: "success",
        style: { width: 500 },
        message: "Файлы успешно загружены",
        description: "Запись файлов на диск",
        placement: "bottomRight",
        duration: 5,
      });
    }
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
            parent: parent ?? null,
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

  const handleUploadFiles = async ({
    formdata,
    uploaded,
    total,
    uploadKey,
    controller,
    handleCancelUpload,
  }: {
    formdata: FormData;
    uploading: number;
    uploaded: number;
    total: number;
    uploadKey: string;
    controller: AbortController;
    handleCancelUpload: () => void;
  }) => {
    formdata.append("parent", parent ?? "");
    const message = `Загружено ${uploaded} / ${total} файлов`;

    try {
      await appAxios.get("auth/refresh");
      await appAxios.post(`/entities/${storageid}`, formdata, {
        signal: controller.signal,
        onUploadProgress: (event) => {
          const progress = Math.round((event.progress ?? 0) * 100);
          notification.open({
            key: uploadKey,
            type: "info",
            style: { width: 500 },
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
        style: { width: 500 },
        description: (
          <Flex gap={10} align="center">
            <span>Запись файлов на диск</span>
            <CheckOutlined className={styles["check"]} />
          </Flex>
        ),
        placement: "bottomRight",
        duration: 0,
        message,
      });
    } catch (error) {
      if (isAxiosError(error) && [400, 500].includes(error.status ?? 0)) {
        notification.open({
          key: uploadKey,
          type: "error",
          style: { width: 500 },
          duration: 5,
          message: "Ошибка",
          placement: "bottomRight",
          description: error?.response?.data.message,
        });
      } else if (isAxiosError(error) && error.code === "ERR_CANCELED") {
        notification.open({
          key: uploadKey,
          type: "warning",
          style: { width: 500 },
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

    const uploadKey = v4();
    let breaked = false;

    const changeEventHandler = async () => {
      const BATCH = 5;

      for (let index = 0; index < (upload.files?.length ?? 0); index += BATCH) {
        if (breaked) break;
        const formdata = new FormData();
        const slice = Array.from(upload.files ?? [])?.slice(
          index,
          index + BATCH,
        );

        for (const file of slice) {
          formdata.append("entities", file, file.name);
          formdata.append("metadata", file.webkitRelativePath);
        }
        const controller = new AbortController();

        const handleCancelUpload = async () => {
          const result = await modal.confirm({
            title: "Отменить загрузку?",
            content: `${(upload.files?.length ?? 0) - index > 1 ? "Файлы" : "Файл"} еще не ${(upload.files?.length ?? 0) - index > 1 ? "загружены" : "загружен"}. Отменить?`,
          });

          if (result) {
            controller.abort();
            breaked = true;
          }
        };

        if (breaked) {
          break;
        }

        await handleUploadFiles({
          formdata,
          uploading: slice.length ?? 0,
          uploaded: index,
          total: upload.files?.length ?? 0,
          uploadKey,
          controller,
          handleCancelUpload,
        });
      }

      upload.removeEventListener("change", changeEventHandler);
      notification.open({
        key: uploadKey,
        type: "success",
        style: { width: 500 },
        description: (
          <Flex gap={10} align="center">
            <span>Запись файлов на диск</span>
            <CheckOutlined className={styles["check"]} />
          </Flex>
        ),
        placement: "bottomRight",
        duration: 5,
        message: "Файлы успешно загружены",
      });
      refetchEntities();
    };

    upload.addEventListener("change", changeEventHandler);
    upload.click();
  };

  const handleDeleteEntities = async (selected: IEntity[]) => {
    message.open({
      key: "delete",
      type: "loading",
      content: `Удаление ${selected.length} ${selected.length > 1 ? "сущностей" : "сущности"}`,
    });
    await deleteEntities({
      storageid,
      body: {
        entities: selected.map((entity) => entity._id),
      },
    });
    message.open({
      key: "delete",
      type: "success",
      content: `${selected.length} ${getNoun(selected.length, "сущность", "сущности", "сущностей")} успешно ${selected.length > 1 ? "удалены" : "удалена"}`,
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
        navigate({
          to: `/storage/${storageid}`,
          search: { parent, entityid: record._id },
        });
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

  const handleChangePage = (page: number, limit: number) => {
    setPagination({ page, limit });
  };

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
        }
      }

      if (role !== "watcher") {
        if (event.ctrlKey) {
          switch (event.code) {
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
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handlePasteEntities, selected]);

  useEffect(() => {
    setPagination({ page, limit: limit ?? 15 });
  }, [limit, page]);

  useEffect(() => {
    navigate({
      to: `/storage/${storageid}`,
      search: {
        parent,
        page: pagination.page,
        limit: pagination.limit,
        entityid,
      },
    });
  }, [pagination]);

  useEffect(() => {
    const lastPage = (entities?.count ?? 0) / pagination.limit + 1;

    if (
      pagination.page !== 1 &&
      pagination.page === lastPage &&
      !entities?.items.length
    ) {
      navigate({
        to: `/storage/${storageid}`,
        search: { parent, limit, page: lastPage - 1, entityid },
      });
    }
  }, [entities?.count, entities?.items, pagination]);

  return (
    <Flex className={styles["body"]} gap={15} vertical>
      <BitBoxTableContainer<IEntity>
        records={entities?.items ?? []}
        columns={STORAGE_TABLE_COLUMNS}
        loading={isEntitiesFetching}
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
      <Pagination
        align="center"
        total={entities?.count}
        current={pagination.page}
        pageSize={pagination.limit}
        pageSizeOptions={[10, 15, 20, 25, 50, 100]}
        onChange={handleChangePage}
        showSizeChanger
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
      {entityid && createPortal(<EntityDownloadContainer />, document.body)}
    </Flex>
  );
};

export default StorageTableContainer;
