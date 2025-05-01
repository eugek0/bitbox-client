import { FC } from "react";
import { Flex } from "antd";
import LoginFormContainer from "@/containers/Auth/LoginFormContainer";

const Login: FC = () => {
  return (
    <Flex justify="center">
      <LoginFormContainer />
    </Flex>
  );
};

export default Login;
