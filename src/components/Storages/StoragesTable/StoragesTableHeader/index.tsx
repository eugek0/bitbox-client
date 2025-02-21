import { FC } from "react";
import { Button, Flex, Typography } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { StoragesTableHeaderProps } from "./types";
import StorageSearcher from "@/containers/Common/StorageSearcher";

const StoragesTableHeader: FC<StoragesTableHeaderProps> = ({
  handleClickCreate,
}) => {
  return (
    <Flex className={styles["body"]} align="center" justify="space-between">
      <Flex align="center" gap={25}>
        <Typography.Title className={styles["body__title"]} level={4}>
          Список хранилищ
        </Typography.Title>
        <Button
          onClick={handleClickCreate}
          color="default"
          variant="filled"
          icon={<PlusOutlined />}
        >
          Создать
        </Button>
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

export default StoragesTableHeader;
