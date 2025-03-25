import { FC } from "react";
import { Flex } from "antd";
import Register from "@/components/Auth/Register";

const RegisterPage: FC = () => {
  return (
    <Flex className="page100vh" vertical>
      <Register />
    </Flex>
  );
};

export default RegisterPage;
