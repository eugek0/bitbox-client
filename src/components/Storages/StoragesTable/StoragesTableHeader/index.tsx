import { FC } from "react";
import { AutoComplete, Button, Flex, Typography } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { StoragesTableHeaderProps } from "./types";

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
      <AutoComplete
        className={styles["body__search"]}
        variant="filled"
        placeholder="Поиск"
        prefix={<SearchOutlined />}
      />
    </Flex>
  );
};

export default StoragesTableHeader;
