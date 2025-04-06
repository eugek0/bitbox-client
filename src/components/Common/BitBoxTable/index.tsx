import { ReactNode } from "react";
import { Breadcrumb, Dropdown, Flex, Table } from "antd";
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
  breadcrumbs,
  infoModal,
  modalProps,
  infoModalProps,
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
      <Flex
        className={styles["table"]}
        onClick={handleBorderClick}
        gap={15}
        vertical
      >
        {breadcrumbs && (
          <div className={styles["breadcrumb"]}>
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
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
      </Flex>
      {modal?.(modalProps) as ReactNode}
      {infoModal?.(infoModalProps) as ReactNode}
    </div>
  );
};

export default BitBoxTable;
