import { FC } from "react";
import { Flex } from "antd";
import Login from "@/components/Auth/Login";
import styles from "./styles.module.scss";

const LoginPage: FC = () => {
  return (
    <Flex className={styles["body"]} vertical>
      <Login />
    </Flex>
  );
};

export default LoginPage;
