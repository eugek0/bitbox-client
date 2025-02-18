import { FC } from "react";
import { Table } from "antd";
import { STORAGES_TABLE_COLUMNS } from "./constants";
import { useGetStoragesQuery } from "../api";

const StoragesTable: FC = () => {
  const { data: storages, isFetching } = useGetStoragesQuery();

  return (
    <Table
      columns={STORAGES_TABLE_COLUMNS}
      dataSource={storages ?? []}
      loading={isFetching}
      pagination={false}
      bordered
    />
  );
};

export default StoragesTable;
