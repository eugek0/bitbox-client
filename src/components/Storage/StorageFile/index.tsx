import { FC } from "react";
import { Button, Flex, Typography } from "antd";
import {
  DownloadOutlined,
  FileFilled,
  RollbackOutlined,
} from "@ant-design/icons";
import { convertBytes } from "@/core/utils";
import { StorageFileProps } from "./types";
import styles from "./styles.module.scss";
import { ENTITY_TYPE_ICON_DICTIONARY } from "@/containers/Storage/StorageTableContainer/constants";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";
import moment from "moment";

const StorageFile: FC<StorageFileProps> = ({
  entity,
  isFetching,
  handleDownload,
  handleClickBack,
}) => {
  return (
    <Flex className={styles["body"]} align="center" justify="center" gap={100}>
      <Flex className={styles["card"]} gap={25} vertical>
        <Flex align="center" justify="space-between">
          <Flex className={styles["header"]} align="center" gap={15}>
            {ENTITY_TYPE_ICON_DICTIONARY[
              entity?.type === "directory"
                ? (entity?.type ?? "")
                : (entity?.extension?.toLowerCase() ?? "")
            ] ?? <FileFilled />}
            <Typography.Text className={styles["fullname"]}>
              {entity?.fullname}
            </Typography.Text>
          </Flex>
          <Button
            onClick={handleClickBack}
            type="text"
            icon={<RollbackOutlined />}
          >
            К хранилищу
          </Button>
        </Flex>
        <Flex align="center" justify="space-between">
          <ProfileBadgeContainer _id={entity?.uploader} />
          <Typography.Text className={styles["upload-time"]}>
            {moment(entity?.uploadedAt).format("DD.MM.YYYY HH:mm:ss")}
          </Typography.Text>
        </Flex>
        <Button
          onClick={handleDownload}
          loading={isFetching}
          icon={<DownloadOutlined />}
          type="primary"
        >
          Скачать {convertBytes(entity?.size ?? 0)}
        </Button>
      </Flex>
    </Flex>
  );
};

export default StorageFile;
