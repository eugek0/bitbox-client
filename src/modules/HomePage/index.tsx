import { FC } from "react";
import { Flex } from "antd";
import HomeContainer from "@/containers/Home";
import HeaderContainer from "@/containers/Layouts/HeaderContainer";
import styles from "./styles.module.scss";

const HomePage: FC = () => {
  return (
    <Flex className={styles["body"]} vertical>
      <HeaderContainer />
      <HomeContainer />
    </Flex>
  );
};

export default HomePage;
