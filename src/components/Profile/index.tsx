import { FC } from "react";
import { Avatar, Button, Descriptions, Flex, Typography } from "antd";
import Header from "../Layouts/Header";
import { ProfileProps } from "./types";
import { Link } from "@tanstack/react-router";
import styles from "./styles.module.scss";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { USER_ROLE_DICTIONARY } from "@/core/constants";
import { convertBytes } from "@/core/utils";

const Profile: FC<ProfileProps> = ({ profile, storages, isMyProfile }) => {
  return (
    <Flex flex={1} gap={10} vertical>
      <Header>Профиль</Header>
      <Flex flex={1} align="center" vertical>
        <div className={styles["wrapper"]}>
          <Flex gap={40}>
            <Flex gap={15} vertical>
              <Avatar className={styles["avatar"]} src={profile?.avatar} />
              <Flex vertical>
                <Typography.Text className={styles["name-lastname"]}>
                  {profile?.name} {profile?.lastname}
                </Typography.Text>
                <Typography.Text className={styles["login"]}>
                  {profile?.login}
                </Typography.Text>
              </Flex>
              {isMyProfile && (
                <Link
                  className={styles["edit-button-link"]}
                  to="/settings/profile"
                >
                  <Button
                    className={styles["edit-button"]}
                    icon={<EditOutlined />}
                  >
                    Редактировать профиль
                  </Button>
                </Link>
              )}
            </Flex>
            <Flex gap={20} vertical>
              <Descriptions
                title="Информация"
                size="small"
                bordered
                items={[
                  {
                    key: "email",
                    label: "Адрес электронной почты",
                    children: profile?.email,
                  },
                  {
                    key: "createdAt",
                    label: "Дата и время регистрации",
                    children: moment(profile?.createdAt).format(
                      "DD.MM.YYYY HH:mm:ss",
                    ),
                  },
                  {
                    key: "role",
                    label: "Роль",
                    children: USER_ROLE_DICTIONARY[profile?.role ?? "user"],
                  },
                ]}
              />
              <Typography.Text className={styles["title"]}>
                Список хранилищ
              </Typography.Text>
              <div className={styles["grid"]}>
                {storages.map((storage) => (
                  <Link
                    to="/storage/$storageid"
                    params={{ storageid: storage._id }}
                    search={{ entityid: undefined, parent: undefined }}
                  >
                    <Flex className={styles["storage-card"]} gap={5} vertical>
                      <Flex justify="space-between" flex={1}>
                        <Typography.Text className={styles["storage-title"]}>
                          {storage.name}
                        </Typography.Text>
                        <Typography.Text>
                          {convertBytes(storage.used)} /{" "}
                          {convertBytes(storage.size)}
                        </Typography.Text>
                      </Flex>

                      {storage.description && (
                        <Typography.Text
                          className={styles["storage-description"]}
                        >
                          {storage.description}
                        </Typography.Text>
                      )}
                    </Flex>
                  </Link>
                ))}
              </div>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};

export default Profile;
