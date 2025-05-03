import { FC } from "react";
import { Avatar, Flex, List, Select, Typography } from "antd";
import { UsersSettingsProps } from "./types";
import styles from "./styles.module.scss";
import parentStyles from "../styles.module.scss";
import { USERS_SETTINGS_OPTIONS } from "./constants";

const UsersSettings: FC<UsersSettingsProps> = ({ users, handleChangeRole }) => {
  return (
    <div className={styles["body"]}>
      <Typography.Title className={parentStyles["title"]} level={3}>
        Пользователи
      </Typography.Title>
      <List
        size="small"
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={user.avatar} />}
              title={
                user.name || user.lastname ? (
                  <>
                    {user.name} {user.lastname}{" "}
                    <span className={styles["login"]}>({user.login})</span>{" "}
                  </>
                ) : (
                  user.login
                )
              }
              description={
                <Flex align="center" gap={5}>
                  <a href={`mailto:${user.email}`} target="_blank">
                    {user.email}
                  </a>{" "}
                  {user.telegram ? (
                    <a href={`https://t.me/${user.telegram}`} target="_blank">
                      @{user.telegram}
                    </a>
                  ) : (
                    ""
                  )}
                </Flex>
              }
            />
            <Select
              onChange={(role) => handleChangeRole(user._id, role)}
              options={USERS_SETTINGS_OPTIONS}
              popupMatchSelectWidth={false}
              defaultValue={user.role}
              variant="borderless"
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UsersSettings;
