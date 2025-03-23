import { ReactNode } from "react";
import { Button, Flex, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StorageSearcher from "@/containers/Common/StorageSearcher";
import { BitBoxTableHeaderProps } from "./types";
import { BitBoxTableRecord } from "@/containers/Common/BitBoxTableContainer/types";
import styles from "./styles.module.scss";

const BitBoxTableHeader = <T extends BitBoxTableRecord>({
  header,
  modalProps,
}: BitBoxTableHeaderProps<T>): ReactNode => {
  return (
    <Flex className={styles["body"]} align="center" justify="space-between">
      <Flex align="center" gap={25}>
        {header?.suffix}
        <Typography.Title className={styles["body__title"]} level={4}>
          {header?.title}
        </Typography.Title>
        {header?.button && (
          <Button
            {...header?.button}
            onClick={(event) =>
              header?.button?.onClick?.(
                {
                  config: modalProps?.config,
                  setConfig: modalProps.setConfig,
                },
                event,
              )
            }
            type={header?.button?.type ?? "primary"}
          />
        )}
      </Flex>
      <StorageSearcher
        className={styles["body__search"]}
        variant="filled"
        placeholder="Поиск"
        prefix={<SearchOutlined />}
      />
    </Flex>
  );
};

export default BitBoxTableHeader;
