import { FC } from "react";
import { Flex } from "antd";
import NotFound from "@/components/Statuses/NotFound";

const NotFoundPage: FC = () => {
  return (
    <Flex className="page100vh">
      <NotFound subTitle="Страница не найдена" />
    </Flex>
  );
};

export default NotFoundPage;
