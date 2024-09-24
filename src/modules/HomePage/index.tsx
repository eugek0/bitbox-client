import HomeContainer from "@/containers/HomeContainer";
import HeaderContainer from "@/containers/Layouts/HeaderContainer";
import { Flex } from "antd";
import { FC } from "react";
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
