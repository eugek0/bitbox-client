import { FC } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "@tanstack/react-router";
import BitBoxTableContainer from "@/containers/Common/BitBoxTableContainer";
import { STORAGE_TABLE_COLUMNS } from "./constants";
import { useGetStorageQuery } from "../api";

const StorageTableContainer: FC = () => {
  const { id } = useParams({ from: "/storage/$id" });
  const navigate = useNavigate();

  const { data } = useGetStorageQuery(id);

  const handleClickBack = () => {
    navigate({ to: "/" });
  };

  return (
    <BitBoxTableContainer
      records={[]}
      columns={STORAGE_TABLE_COLUMNS}
      loading={false}
      header={{
        title: data?.name,
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
