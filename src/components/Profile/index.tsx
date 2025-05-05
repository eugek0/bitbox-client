import { FC } from "react";
import { Avatar, Button, Flex, Spin, Typography } from "antd";
import Header from "../Layouts/Header";
import { ProfileProps } from "./types";
import { Link } from "@tanstack/react-router";
import styles from "./styles.module.scss";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { convertBytes } from "@/core/utils";
import moment from "moment";
import { USER_ROLE_DICTIONARY } from "@/core/constants";

const Profile: FC<ProfileProps> = ({
  profile,
  isProfileLoading,
  storages,
  isStoragesLoading,
  isMyProfile,
}) => {
  return (
    <Flex className={styles["body"]} flex={1} gap={10} vertical>
      <Header sticky>Профиль</Header>
      <Flex flex={1} align="center" vertical>
        <div className={styles["wrapper"]}>
          <Flex className={styles["content"]} gap={40}>
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
              <Typography.Text>
                Email: <a href={`mailto:${profile?.email}`}>{profile?.email}</a>
              </Typography.Text>
              <Typography.Text>
                Дата регистрации:{" "}
                {moment(profile?.createdAt).format("DD.MM.YYYY")}
              </Typography.Text>
              <Typography.Text>
                Роль: {USER_ROLE_DICTIONARY[profile?.role ?? "user"]}
              </Typography.Text>
            </Flex>
            <Flex gap={20} flex={1} vertical>
              <Typography.Text className={styles["title"]}>
                Список хранилищ
              </Typography.Text>
              {isStoragesLoading ? (
                <Flex align="center" justify="center" flex={1} vertical>
                  <Spin indicator={<LoadingOutlined />} />
                </Flex>
              ) : (
                <div className={styles["grid"]}>
                  {storages.map((storage) => (
                    <Link
                      to="/storage/$storageid"
                      params={{ storageid: storage._id }}
                      search={{ entityid: undefined, parent: undefined }}
                      key={storage._id}
                    >
                      <Flex className={styles["storage-card"]} gap={5} vertical>
                        <Flex justify="space-between" gap={15} flex={1}>
                          <Typography.Text className={styles["storage-title"]}>
                            {storage.name}
                          </Typography.Text>
                          <Typography.Text className={styles["storage-size"]}>
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
              )}
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};

export default Profile;
