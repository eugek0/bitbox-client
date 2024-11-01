import LoginFormContainer from "@/containers/Auth/LoginFormContainer";
import HeaderContainer from "@/containers/Layouts/HeaderContainer";
import { Flex } from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";

const LoginPage: FC = () => {
  return (
    <Flex className={styles["body"]} vertical>
      <HeaderContainer />
      <LoginFormContainer />
    </Flex>
  );
};

export default LoginPage;
