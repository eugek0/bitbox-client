import { FC } from "react";
import { Avatar, Flex, List, Typography } from "antd";
import { UserListSidebarProps } from "./types";
import Logotype from "../Logotype";
import { APP_NAME } from "@/core/constants";
import { Link } from "@tanstack/react-router";
import styles from "./styles.module.scss";

const UserListSidebar: FC<UserListSidebarProps> = ({ users }) => {
  return (
    <Flex className={styles["body"]} vertical>
      <Flex align="center" gap={10}>
        <Link className={styles["logotype-container"]} to="/">
          <Logotype />
          <Typography.Text className={styles["app-name"]}>
            {APP_NAME}
          </Typography.Text>
        </Link>
      </Flex>
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item key={user._id}>
            <List.Item.Meta
              avatar={<Avatar src={user.avatar} />}
              title={user.login}
              description={user.email}
            />
          </List.Item>
        )}
      />
    </Flex>
  );
};

export default UserListSidebar;
