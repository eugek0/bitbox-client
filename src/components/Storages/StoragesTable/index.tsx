import { FC } from "react";
import { Table } from "antd";
import CreateStorageModalContainer from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer";
import StoragesTableHeaderContainer from "@/containers/Storages/StoragesTableContainer/StoragesTableHeaderContainer";
import { STORAGES_TABLE_COLUMNS } from "./constants";
import { StoragesTableProps } from "./types";
import styles from "./styles.module.scss";

const StoragesTable: FC<StoragesTableProps> = ({
  storages,
  loading,
  onRow,
  handleClickCreate,
}) => {
  return (
    <div className={styles["body"]}>
      <StoragesTableHeaderContainer handleClickCreate={handleClickCreate} />
      <Table
        onRow={onRow}
        columns={STORAGES_TABLE_COLUMNS}
        dataSource={storages}
        loading={loading}
        pagination={false}
        rowKey="_id"
        bordered
      />
      <CreateStorageModalContainer />
    </div>
  );
};

export default StoragesTable;
