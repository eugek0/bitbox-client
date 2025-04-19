import { ReactNode } from "react";
import { Breadcrumb, Dropdown, Flex, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import BitBoxTableHeader from "./BitBoxTableHeader";
import { BitBoxTableProps } from "./types";
import { BitBoxTableRecord } from "@/containers/Common/BitBoxTableContainer/types";
import styles from "./styles.module.scss";
import { FaBoxOpen } from "react-icons/fa";

const BitBoxTable = <T extends BitBoxTableRecord>({
  records,
  columns,
  loading,
  header,
  modal,
  breadcrumbs,
  infoModal,
  modalProps,
  isDragOver,
  infoModalProps,
  contextMenuProps,
  handleBorderClick,
  handleBorderContextMenu,
  handleDragLeave,
  handleDragEnter,
  handleDrop,
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
        onContextMenu={handleBorderContextMenu}
        gap={6}
        vertical
      >
        {breadcrumbs && (
          <div className={styles["breadcrumb"]}>
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        <Flex
          className={`${styles["dropzone"]} ${isDragOver ? styles["drop"] : ""}`}
          flex={1}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
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
          {isDragOver && (
            <Flex
              gap={15}
              align="center"
              className={styles["drop__message"]}
              vertical
            >
              <FaBoxOpen size={60} />
              <span>Сбросьте сюда свои файлы</span>
            </Flex>
          )}
        </Flex>
      </Flex>
      {modal?.(modalProps) as ReactNode}
      {infoModal?.(infoModalProps) as ReactNode}
    </div>
  );
};

export default BitBoxTable;
