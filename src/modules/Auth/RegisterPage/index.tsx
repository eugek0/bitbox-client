import { FC } from "react";
import { Flex } from "antd";
import Register from "@/components/Auth/Register";
import styles from "./styles.module.scss";

const RegisterPage: FC = () => {
  return (
    <Flex className={styles["body"]} vertical>
      <Register />
    </Flex>
  );
};

export default RegisterPage;
