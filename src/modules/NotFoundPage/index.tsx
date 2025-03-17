import NotFound from "@/components/NotFound";
import { Flex } from "antd";
import { FC } from "react";
import styles from "../styles.module.scss";

const NotFoundPage: FC = () => {
  return (
    <Flex className={styles["page100vh"]}>
      <NotFound />
    </Flex>
  );
};

export default NotFoundPage;
