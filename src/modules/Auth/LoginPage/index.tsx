import { FC } from "react";
import { Flex } from "antd";
import Login from "@/components/Auth/Login";

const LoginPage: FC = () => {
  return (
    <Flex className="page100vh" vertical>
      <Login />
    </Flex>
  );
};

export default LoginPage;
