import { FC } from "react";
import { Flex } from "antd";
import RecoverPasswordFormContainer from "@/containers/Auth/RecoverPasswordFormContainer";

const RecoverPassword: FC = () => {
  return (
    <Flex justify="center">
      <RecoverPasswordFormContainer />
    </Flex>
  );
};

export default RecoverPassword;
