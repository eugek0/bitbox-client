import { FC } from "react";
import { Flex } from "antd";
import StoragesTableContainer from "@/containers/Storages/StoragesTableContainer";
import { HomeProps } from "./types";
import styles from "./styles.module.scss";

const Home: FC<HomeProps> = () => {
  return (
    <Flex className={styles["body"]} vertical>
      <StoragesTableContainer />
    </Flex>
  );
};

export default Home;
