import { FC } from "react";
import { HomeProps } from "./types";
import StoragesTable from "@/containers/Storages/StoragesTable";
import { AutoComplete, Button, Flex, Typography } from "antd";
import styles from "./styles.module.scss";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const Home: FC<HomeProps> = () => {
  return (
    <Flex className={styles["body"]} vertical>
      <Flex className={styles["header"]} align="center" justify="space-between">
        <Flex align="center" gap={25}>
          <Typography.Title className={styles["header__title"]} level={4}>
            Список хранилищ
          </Typography.Title>
          <Button color="default" variant="filled" icon={<PlusOutlined />}>
            Создать
          </Button>
        </Flex>
        <AutoComplete
          className={styles["header__search"]}
          variant="filled"
          placeholder="Поиск"
          prefix={<SearchOutlined />}
        />
      </Flex>
      <StoragesTable />
    </Flex>
  );
};

export default Home;
