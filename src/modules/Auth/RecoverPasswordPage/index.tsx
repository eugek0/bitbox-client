import { FC } from "react";
import { Flex } from "antd";
import RecoverPasswordContainer from "@/containers/Auth/RecoverPasswordContainer";

const RecoverPasswordPage: FC = () => {
  return (
    <Flex className="page100vh" vertical>
      <RecoverPasswordContainer />
    </Flex>
  );
};

export default RecoverPasswordPage;
