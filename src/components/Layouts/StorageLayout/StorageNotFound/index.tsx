import { FC } from "react";
import NotFound from "@/components/Statuses/NotFound";
import { Flex } from "antd";

const StorageNotFound: FC = () => {
  return (
    <Flex className="page100vh" align="center" justify="center">
      <NotFound subTitle="Такого хранилища не существует" />
    </Flex>
  );
};

export default StorageNotFound;
