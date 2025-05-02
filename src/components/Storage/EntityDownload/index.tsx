import { FC } from "react";
import { Button, Dropdown, Flex, Skeleton, Typography } from "antd";
import { EntityDownloadProps } from "./types";
import styles from "./styles.module.scss";
import {
  CloseOutlined,
  DownloadOutlined,
  FileFilled,
  MoreOutlined,
} from "@ant-design/icons";
import {
  ENTITY_TYPE_DICTIONARY,
  ENTITY_TYPE_ICON_DICTIONARY,
} from "@/containers/Storage/StorageTableContainer/constants";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";
import { convertBytes } from "@/core/utils";
import moment from "moment";
import { ENTITY_DOWNLOAD_DROPDOWN_ITEMS } from "./constants";

const EntityDownload: FC<EntityDownloadProps> = ({
  entity,
  isFetching,
  isDownloading,
  dropdownHandlers,
  handleClose,
  handleDownload,
}) => {
  return (
    <Flex
      onClick={handleClose}
      className={styles["body"]}
      align="center"
      justify="center"
    >
      <Flex
        className={styles["head"]}
        onClick={(event) => event.stopPropagation()}
        justify="space-between"
        align="center"
      >
        <Flex align="center" gap={15}>
          <ProfileBadgeContainer size="middle" _id={entity?.uploader} />
          {isFetching ? (
            <Skeleton.Input className={styles["upload-time-skeleton"]} active />
          ) : (
            <Typography.Text className={styles["upload-time"]}>
              {moment(entity?.uploadedAt).format("DD.MM.YYYY HH:mm:ss")}
            </Typography.Text>
          )}
        </Flex>
        <Flex align="center" gap={15}>
          <Button
            onClick={handleDownload}
            loading={isDownloading}
            icon={<DownloadOutlined />}
            type="text"
          />
          <Dropdown
            trigger={["click"]}
            menu={{
              items: ENTITY_DOWNLOAD_DROPDOWN_ITEMS(dropdownHandlers),
            }}
          >
            <Button
              onClick={(event) => event.preventDefault()}
              icon={<MoreOutlined />}
              type="text"
            />
          </Dropdown>
          <Button onClick={handleClose} icon={<CloseOutlined />} type="text" />
        </Flex>
      </Flex>
      <Flex
        className={styles["modal"]}
        onClick={(event) => event.stopPropagation()}
        gap={30}
        vertical
      >
        <Flex align="center" justify="space-between" gap={15}>
          <Flex
            className={styles["header"]}
            justify="space-between"
            align="center"
            gap={15}
          >
            <Flex align="center" gap={15}>
              {ENTITY_TYPE_ICON_DICTIONARY[
                entity?.type === "directory"
                  ? (entity?.type ?? "")
                  : (entity?.extension?.toLowerCase() ?? "")
              ] ?? <FileFilled />}
              {isFetching ? (
                <Skeleton.Input
                  className={styles["fullname-skeleton"]}
                  active
                />
              ) : (
                <Typography.Text
                  className={styles["fullname"]}
                  title={entity?.fullname}
                >
                  {entity?.fullname}
                </Typography.Text>
              )}
            </Flex>

            <Typography.Text
              className={styles["fullname"]}
              title={entity?.fullname}
            >
              {ENTITY_TYPE_DICTIONARY[entity?.extension ?? "file"]}
            </Typography.Text>
          </Flex>
        </Flex>
        <Button
          onClick={handleDownload}
          loading={isDownloading}
          icon={<DownloadOutlined />}
          type="primary"
        >
          Скачать {isFetching ? "" : convertBytes(entity?.size ?? 0)}
        </Button>
      </Flex>
    </Flex>
  );
};

export default EntityDownload;
