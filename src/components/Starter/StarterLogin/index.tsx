import { FC } from "react";
import AdminLoginContainer from "@/containers/Auth/AdminLoginFormContainer";
import { Flex, Typography } from "antd";
import styles from "./styles.module.scss";
import Logotype from "@/components/Common/Logotype";

const StarterLogin: FC = () => {
  return (
    <Flex justify="center" gap={100}>
      <Flex justify="center" gap={10} vertical>
        <Flex gap={10} align="center">
          <Logotype size="large" />
          <Typography.Title className={styles["title"]}>
            Привет!
          </Typography.Title>
        </Flex>
        <Typography.Text className={styles["text"]}>
          При первом запуске нужно произвести настройку приложения. Введите
          почту и пароль администратора.
        </Typography.Text>
      </Flex>
      <AdminLoginContainer redirectTo="/starter/" />;
    </Flex>
  );
};

export default StarterLogin;
