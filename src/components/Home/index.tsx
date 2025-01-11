import { FC } from "react";
import { sample } from "lodash";
import { Link } from "@tanstack/react-router";
import { Button, Flex, Typography } from "antd";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { APP_NAME, APP_SLOGANS } from "@/core/constants";
import Logotype from "../Common/Logotype";
import styles from "./styles.module.scss";
import { HomeProps } from "./types";

const Home: FC<HomeProps> = ({ profile }) => {
  return (
    <Flex className={styles["body"]} align="center" justify="center">
      <Flex gap={40}>
        <Flex className={styles["text-section"]} gap={10} vertical>
          <Flex gap={10} align="center">
            <Logotype size="large" />
            <Typography.Title className={styles["slogan"]}>
              {APP_NAME} <span className={styles["hyphen"]}>—</span>
              <span className={styles["slogan__text"]}>
                {" "}
                {sample(APP_SLOGANS)}
              </span>
            </Typography.Title>
          </Flex>
          <Flex className={styles["bubble"]} gap={10} vertical>
            <Typography.Paragraph className={styles["slogan__paragraph"]}>
              Сервис для быстрого и безопасного доступа к файлам прямо у вас на
              серверах! Доступны личные, а также групповые хранилища.
            </Typography.Paragraph>
            {profile && (
              <Flex gap={10} align="center">
                <Link from="/" to="/storage/my">
                  <Button
                    type="primary"
                    size="large"
                    icon={<AppstoreOutlined />}
                  >
                    Моё хранилище
                  </Button>
                </Link>
                <Link from="/" to="/">
                  <Button size="large" icon={<UserOutlined />}>
                    Мой профиль
                  </Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
