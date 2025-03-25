import { FC } from "react";
import { Flex, Result, Button } from "antd";
import { Link } from "@tanstack/react-router";
import { StatusProps } from "../types";

const NotFound: FC<StatusProps> = ({ ...props }) => {
  return (
    <Flex flex={1} align="center" justify="center">
      <Result
        {...props}
        status="404"
        title="404"
        extra={
          <Link to="/">
            <Button type="link">К списку хранилищ</Button>
          </Link>
        }
      />
    </Flex>
  );
};

export default NotFound;
