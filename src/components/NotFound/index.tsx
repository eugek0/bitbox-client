import { Link } from "@tanstack/react-router";
import { Flex, Result, Button } from "antd";
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <Flex flex={1} align="center" justify="center">
      <Result
        status="404"
        title="404"
        subTitle="Страница не найдена"
        extra={
          <Link to="/">
            <Button type="link">На главную</Button>
          </Link>
        }
      />
    </Flex>
  );
};

export default NotFound;
