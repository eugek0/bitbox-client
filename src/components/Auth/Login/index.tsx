import { FC } from "react";
import { Flex, Typography } from "antd";
import LoginFormContainer from "@/containers/Auth/LoginFormContainer";
import { APP_NAME } from "@/core/constants";
import Logotype from "@/components/Common/Logotype";
import styles from "../styles.module.scss";

const Login: FC = () => {
  return (
    <Flex justify="center" gap={100}>
      <Flex className={styles["hello"]} justify="center" gap={10} vertical>
        <Flex align="center" gap={10}>
          <Logotype className={styles["hello-logotype"]} />
          <Typography.Title className={styles["hello-title"]}>
            Привет!
          </Typography.Title>
        </Flex>
        <Typography.Text className={styles["hello-text"]}>
          С возвращением в{" "}
          <span className={styles["hello-text_bold"]}>{APP_NAME}</span>!
          Пожалуйста введите свои адрес электронной почты и пароль.
        </Typography.Text>
      </Flex>
      <LoginFormContainer />
    </Flex>
  );
};

export default Login;
