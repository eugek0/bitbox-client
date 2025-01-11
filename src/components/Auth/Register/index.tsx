import { FC } from "react";
import { Flex } from "antd";
import RegisterFormContainer from "@/containers/Auth/RegisterFormContainer";

const Register: FC = () => {
  return (
    <Flex justify="center" gap={100}>
      <RegisterFormContainer />
    </Flex>
  );
};

export default Register;
