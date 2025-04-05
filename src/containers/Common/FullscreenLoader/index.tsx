import { FC } from "react";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const FullscreenLoader: FC = () => {
  return (
    <Flex className='page100vh' justify="center" align="center">
      <Spin indicator={<LoadingOutlined />} />
    </Flex>
  );
};

export default FullscreenLoader;
