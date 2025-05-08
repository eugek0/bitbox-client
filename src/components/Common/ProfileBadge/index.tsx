import { Avatar, Flex, Skeleton, Typography } from "antd";
import { FC } from "react";
import { ProfileBadgeProps } from "./types";
import styles from "./styles.module.scss";
import { CrownFilled } from "@ant-design/icons";
import { TRole } from "@/containers/Auth/types";
import { Link } from "@tanstack/react-router";

const ProfileBadge: FC<ProfileBadgeProps> = ({
  avatar,
  login,
  name,
  _id,
  lastname,
  role,
  subtitle,
  loading,
  showFullname,
  size = "small",
}) => {
  return true ? (
    <Flex className={styles[size]} align="center" gap={10}>
      <Skeleton.Avatar className={styles["avatar"]} active size="small" />
      <Skeleton.Input className={styles["login-skeleton"]} active />
    </Flex>
  ) : (
    <Link
      className={`${styles["body"]} ${styles[size]}`}
      to="/profile/$userid"
      params={{ userid: _id ?? "" }}
    >
      <Avatar className={styles["avatar"]} src={avatar} size="small" />
      <Flex vertical>
        <Flex gap={5} align="center">
          {showFullname ? (
            <>
              <Typography.Text className={styles["nickname"]}>
                {name} {lastname}
              </Typography.Text>
              <Typography.Text
                className={`${styles["nickname"]} ${styles["login"]}`}
              >
                ({login})
              </Typography.Text>
              {(["administrator", "owner"] as TRole[]).includes(
                role ?? "user",
              ) && (
                <CrownFilled
                  className={styles["role-icon"]}
                  title="Администратор"
                />
              )}
            </>
          ) : (
            <>
              <Typography.Text className={styles["nickname"]}>
                {login}
              </Typography.Text>
              {(["administrator", "owner"] as TRole[]).includes(
                role ?? "user",
              ) && (
                <CrownFilled
                  className={styles["role-icon"]}
                  title="Администратор"
                />
              )}
            </>
          )}
        </Flex>
        {subtitle && (
          <Typography.Text className={styles["subtitle"]}>
            {subtitle}
          </Typography.Text>
        )}
      </Flex>
    </Link>
  );
};

export default ProfileBadge;
