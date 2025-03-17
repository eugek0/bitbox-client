import { ReactNode } from "react";
import { Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import BitBoxTableHeader from "./BitBoxTableHeader";
import { BitBoxTableProps } from "./types";
import { BitBoxTableRecord } from "@/containers/BitBoxTableContainer/types";
import styles from "./styles.module.scss";

const BitBoxTable = <T extends BitBoxTableRecord>({
  records,
  columns,
  loading,
  header,
  modal,
  modalProps,
  onRow,
}: BitBoxTableProps<T>): ReactNode => {
  return (
    <div className={styles["body"]}>
      <BitBoxTableHeader modalProps={modalProps} header={header} />
      <Table
        onRow={onRow}
        columns={columns}
        dataSource={records}
        loading={{ indicator: <LoadingOutlined />, spinning: loading }}
        pagination={false}
        rowKey="_id"
        bordered
      />
      {modal?.(modalProps) as ReactNode}
    </div>
  );
};

export default BitBoxTable;
