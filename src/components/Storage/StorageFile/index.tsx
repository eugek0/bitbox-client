import { FC } from "react";
import { Button, Flex, Typography } from "antd";
import {
  DownloadOutlined,
  FileFilled,
  RollbackOutlined,
} from "@ant-design/icons";
import { StorageFileProps } from "./types";
import styles from "./styles.module.scss";
import { convertBytes } from "@/core/utils";
import Logotype from "@/components/Common/Logotype";
import { APP_NAME } from "@/core/constants";

const StorageFile: FC<StorageFileProps> = ({
  fullname,
  size,
  isFetching,
  handleDownload,
  handleClickBack,
}) => {
  return (
    <Flex className={styles["body"]} align="center" justify="center" gap={100}>
      <Flex className={styles["card"]} gap={20} vertical>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={15}>
            <Logotype />
            <Typography.Text className={styles["app-name"]}>
              {APP_NAME}
            </Typography.Text>
          </Flex>
          <Button
            onClick={handleClickBack}
            type="text"
            icon={<RollbackOutlined />}
          >
            Обратно
          </Button>
        </Flex>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={15}>
            <FileFilled className={styles["icon"]} />
            <Typography.Text className={styles["fullname"]}>
              {fullname}
            </Typography.Text>
          </Flex>
          <Typography.Text className={styles["size"]}>
            {convertBytes(size)}
          </Typography.Text>
        </Flex>
        <Button
          onClick={handleDownload}
          loading={isFetching}
          icon={<DownloadOutlined />}
          type="primary"
        >
          Скачать
        </Button>
      </Flex>
    </Flex>
  );
};

export default StorageFile;
