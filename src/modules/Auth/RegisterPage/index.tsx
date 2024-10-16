import RegisterFormContainer from "@/containers/Auth/RegisterFormContainer";
import HeaderContainer from "@/containers/Layouts/HeaderContainer";
import { Flex } from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";

const RegisterPage: FC = () => {
  return (
    <Flex className={styles["body"]} vertical>
      <HeaderContainer />
      <RegisterFormContainer />
    </Flex>
  );
};

export default RegisterPage;
