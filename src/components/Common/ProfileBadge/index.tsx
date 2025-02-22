import { Avatar, Flex, Skeleton, Typography } from "antd";
import { FC } from "react";
import { ProfileBadgeProps } from "./types";
import styles from "./styles.module.scss";
import { CrownFilled } from "@ant-design/icons";

const ProfileBadge: FC<ProfileBadgeProps> = ({
  avatar,
  login,
  role,
  loading,
}) => {
  return loading ? (
    <Flex align="center" gap={10}>
      <Skeleton.Avatar active size="small" />
      <Skeleton.Input className={styles["login-skeleton"]} active />
    </Flex>
  ) : (
    <Flex align="center" gap={10}>
      <Avatar src={avatar} size="small" />
      <Flex align="center" gap={5}>
        <Typography.Text>{login}</Typography.Text>
        {role === "admin" && (
          <CrownFilled className={styles["role-icon"]} title="Администратор" />
        )}
      </Flex>
    </Flex>
  );
};

export default ProfileBadge;
