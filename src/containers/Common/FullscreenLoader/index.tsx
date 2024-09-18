import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";

const FullscreenLoader: FC = () => {
  return (
    <Flex className={styles["body"]} justify="center" align="center">
      <Spin indicator={<LoadingOutlined />} />
    </Flex>
  );
};

export default FullscreenLoader;
