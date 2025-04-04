import { FC, useContext, useState } from "react";
import { Button, MenuProps } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { TableProps } from "antd/lib";
import { useNavigate, useParams } from "@tanstack/react-router";
import BitBoxTableContainer from "@/containers/Common/BitBoxTableContainer";
import { StorageContext } from "../../Layouts/StorageLayoutContainer/context";
import { useGetStorageEntitiesQuery } from "../api";
import { STORAGE_TABLE_COLUMNS } from "./constants";
import styles from "./styles.module.scss";

const StorageTableContainer: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const { storageid } = useParams({ from: "/storage/$storageid/" });
  const navigate = useNavigate();

  const context = useContext(StorageContext);

  const { data: entities } = useGetStorageEntitiesQuery({
    storageid,
    params: { path: "/" },
  });

  if (!context) {
    throw new Error("Context not found");
  }

  const { name } = context;

  const handleClickBack = () => {
    navigate({ to: "/" });
  };

  const onRow: TableProps["onRow"] = (record) => ({
    className: `${styles["row"]} ${selected.includes(record._id) ? styles["row__selected"] : ""}`,
    onDoubleClick: () => {
      if (record?.type === "file") {
        navigate({ to: `/storage/${storageid}/file/${record._id}` });
      }
    },
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
  });

  const menu = (): MenuProps => ({
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
            onClick: () => {},
            danger: true,
          },
        ],
      },
    ],
  });

  return (
    <BitBoxTableContainer
      records={entities ?? []}
      columns={STORAGE_TABLE_COLUMNS}
      loading={false}
      onRow={onRow}
      contextMenu={{
        show: true,
        menu,
      }}
      header={{
        title: name,
        button: {
          children: "Добавить",
          icon: <UploadOutlined />,
        },
        suffix: (
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
  );
};

export default StorageTableContainer;
