import { FC } from "react";
import { Flex } from "antd";
import RecoverEmail from "@/components/Auth/RecoverEmail";

const RecoverEmailPage: FC = () => {
  return (
    <Flex className="page100vh" vertical>
      <RecoverEmail />
    </Flex>
  );
};

export default RecoverEmailPage;
