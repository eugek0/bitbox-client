import { FC } from "react";
import { Table } from "antd";
import CreateStorageModalContainer from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer";
import StoragesTableHeaderContainer from "@/containers/Storages/StoragesTableContainer/StoragesTableHeaderContainer";
import { STORAGES_TABLE_COLUMNS } from "./constants";
import { StoragesTableProps } from "./types";
import styles from "./styles.module.scss";

const StoragesTable: FC<StoragesTableProps> = ({
  isModalOpen,
  storages,
  loading,
  handleCloseModal,
  handleOkModal,
  handleClickCreate,
}) => {
  return (
    <div className={styles["body"]}>
      <StoragesTableHeaderContainer handleClickCreate={handleClickCreate} />
      <Table
        columns={STORAGES_TABLE_COLUMNS}
        dataSource={storages}
        loading={loading}
        pagination={false}
        rowKey="_id"
        bordered
      />
      <CreateStorageModalContainer
        open={isModalOpen}
        handleOkModal={handleOkModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default StoragesTable;
