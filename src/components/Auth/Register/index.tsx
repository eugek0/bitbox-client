import { FC } from "react";
import { Flex, Typography } from "antd";
import Logotype from "@/components/Common/Logotype";
import RegisterFormContainer from "@/containers/Auth/RegisterFormContainer";
import styles from "../styles.module.scss";

const Register: FC = () => {
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
          Вы у нас впервые? Для регистрации введите свой логин, адрес
          электронной почты и пароль.
        </Typography.Text>
      </Flex>
      <RegisterFormContainer />
    </Flex>
  );
};

export default Register;
