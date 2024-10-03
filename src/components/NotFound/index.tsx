import { Flex, Typography } from "antd";
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <Flex flex={1} align="center" justify="center">
      <Typography.Text>404. Страница не найдена</Typography.Text>
    </Flex>
  );
};

export default NotFound;
