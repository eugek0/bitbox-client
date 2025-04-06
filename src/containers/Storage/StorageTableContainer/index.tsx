import { FC, MouseEvent, useContext, useState } from "react";
import { BreadcrumbProps, Button, Dropdown, Flex, MenuProps } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  FolderAddOutlined,
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
  useUploadEntitiesMutation,
} from "../api";
import { STORAGE_TABLE_COLUMNS } from "./constants";
import CreateDirectoryModalContainer from "./CreateDirectoryModalContainer";
import { IEntity } from "../types";
import { BitBoxTableContextMenuDropdownProps } from "@/containers/Common/BitBoxTableContainer/types";
import { LuFileUp, LuFolderUp } from "react-icons/lu";

const StorageTableContainer: FC = () => {
  const [isCreateDirectoryModalOpen, setIsCreateDirectoryModalOpen] =
    useState<boolean>(false);

  const { storageid } = useParams({ from: "/storage/$storageid/" });
  const { parent } = useSearch({ from: "/storage/$storageid/" });
  const navigate = useNavigate();

  const context = useContext(StorageContext);

  const { data: entities, refetch: refetchEntities } =
    useGetStorageEntitiesQuery({
      storageid,
      params: { parent },
    });
  const [createDirectory] = useCreateDirectoryMutation();
  const [uploadEntities] = useUploadEntitiesMutation();
  const [deleteEntities] = useDeleteEntitiesMutation();

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

  const handleUploadDirectory = (directory: boolean) => {
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

      await uploadEntities({ body: formdata, storageid });
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

  return (
    <>
      <BitBoxTableContainer
        records={entities?.items ?? []}
        columns={STORAGE_TABLE_COLUMNS}
        loading={false}
        onRow={onRow}
        breadcrumbs={breadcrumbs}
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
                    onClick: () => handleUploadDirectory(false),
                    icon: <LuFileUp />,
                  },
                  {
                    key: "3",
                    label: "Загрузить директорию",
                    onClick: () => handleUploadDirectory(true),
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
