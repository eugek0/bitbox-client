import { FC } from "react";
import { Button, Flex, Result } from "antd";
import { Link } from "@tanstack/react-router";
import { StatusProps } from "../types";

const Forbidden: FC<StatusProps> = ({ ...props }) => {
  return (
    <Flex flex={1} align="center" justify="center">
      <Result
        {...props}
        status={"403"}
        title="403"
        extra={
          <Flex vertical>
            <Link to="/">
              <Button type="link">К списку хранилищ</Button>
            </Link>
          </Flex>
        }
      />
    </Flex>
  );
};

export default Forbidden;
