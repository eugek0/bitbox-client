import { ReactNode } from "react";
import { Dropdown, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import BitBoxTableHeader from "./BitBoxTableHeader";
import { BitBoxTableProps } from "./types";
import { BitBoxTableRecord } from "@/containers/Common/BitBoxTableContainer/types";
import styles from "./styles.module.scss";

const BitBoxTable = <T extends BitBoxTableRecord>({
  records,
  columns,
  loading,
  header,
  modal,
  modalProps,
  contextMenuProps,
  handleBorderClick,
  onRow,
}: BitBoxTableProps<T>): ReactNode => {
  return (
    <div className={styles["body"]}>
      <BitBoxTableHeader modalProps={modalProps} header={header} />
      <Dropdown
        className={`${contextMenuProps?.className ?? ""} ${styles["dropdown"]}`}
        trigger={["contextMenu"]}
        {...contextMenuProps}
      />
      <div onClick={handleBorderClick} className={styles["table"]}>
        <Table
          onRow={onRow}
          columns={columns}
          dataSource={records}
          loading={{ indicator: <LoadingOutlined />, spinning: loading }}
          pagination={false}
          rowKey="_id"
          bordered
          sticky
        />
      </div>
      {modal?.(modalProps) as ReactNode}
    </div>
  );
};

export default BitBoxTable;
