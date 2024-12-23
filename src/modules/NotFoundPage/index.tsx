import NotFound from "@/components/NotFound";
import { Flex } from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";

const NotFoundPage: FC = () => {
  return (
    <Flex className={styles["body"]}>
      <NotFound />
    </Flex>
  );
};

export default NotFoundPage;
