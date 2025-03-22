import { FC, useContext } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "@tanstack/react-router";
import BitBoxTableContainer from "@/containers/Common/BitBoxTableContainer";
import { STORAGE_TABLE_COLUMNS } from "./constants";
import { StorageContext } from "../context";
import { useGetStorageEntitiesQuery } from "../api";
import { TableProps } from "antd/lib";

const StorageTableContainer: FC = () => {
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
    onDoubleClick: () => {
      if (record?.type === "file") {
        navigate({ to: `/storage/${storageid}/file/${record._id}` });
      }
    },
  });

  return (
    <BitBoxTableContainer
      records={entities ?? []}
      columns={STORAGE_TABLE_COLUMNS}
      loading={false}
      onRow={onRow}
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
