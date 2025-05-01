import { FC } from "react";
import { Flex } from "antd";
import RecoverEmailFormContainer from "@/containers/Auth/RecoverEmailFormContainer";

const RecoverEmail: FC = () => {
  return (
    <Flex justify="center">
      <RecoverEmailFormContainer />
    </Flex>
  );
};

export default RecoverEmail;
