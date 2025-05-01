import { FC } from "react";
import { Flex } from "antd";
import RecoverPassword from "@/components/Auth/RecoverPassword";

const RecoverPasswordPage: FC = () => {
  return (
    <Flex className="page100vh" vertical>
      <RecoverPassword />
    </Flex>
  );
};

export default RecoverPasswordPage;
