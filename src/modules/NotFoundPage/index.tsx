import NotFound from "@/components/NotFound";
import HeaderContainer from "@/containers/Layouts/HeaderContainer";
import { Flex } from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";

const NotFoundPage: FC = () => {
  return (
    <Flex className={styles["body"]} vertical>
      <HeaderContainer />
      <NotFound />
    </Flex>
  );
};

export default NotFoundPage;
