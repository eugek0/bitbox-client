import { Avatar, Flex, Skeleton, Typography } from "antd";
import { FC } from "react";
import { ProfileBadgeProps } from "./types";
import styles from "./styles.module.scss";

const ProfileBadge: FC<ProfileBadgeProps> = ({ avatar, login, loading }) => {
  return loading ? (
    <Flex align="center" gap={10}>
      <Skeleton.Avatar active size="small" />
      <Skeleton.Input className={styles["login-skeleton"]} active />
    </Flex>
  ) : (
    <Flex align="center" gap={10}>
      <Avatar src={avatar} size="small" />
      <Typography.Text>{login}</Typography.Text>
    </Flex>
  );
};

export default ProfileBadge;
