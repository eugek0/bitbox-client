import { FC } from "react";
import { Flex } from "antd";
// import HeaderContainer from "@/containers/Layouts/HeaderContainer";
import Login from "@/components/Auth/Login";
import styles from "./styles.module.scss";

const LoginPage: FC = () => {
  return (
    <Flex className={styles["body"]} vertical>
      {
        // <HeaderContainer />
      }
      <Login />
    </Flex>
  );
};

export default LoginPage;
