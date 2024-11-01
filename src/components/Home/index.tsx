import { APP_NAME, APP_SLOGANS } from "@/core/constants";
import { Link } from "@tanstack/react-router";
import { Button, Flex, Typography } from "antd";
import { sample } from "lodash";
import { FC } from "react";
import Logotype from "../Common/Logotype";
import styles from "./styles.module.scss";
import { HomeProps } from "./types";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";

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
              Сервис для быстрого и безопасного доступа к файлам. Мы даем
              бесплатные 10 гигабайт хранилища, а также предоставляем
              всевозможные плюшки для удобства пользователей и информативности.
            </Typography.Paragraph>
            {profile && (
              <Flex gap={10} align="center">
                <Link from="/" to="/storage/my">
                  <Button
                    type="primary"
                    size="large"
                    icon={<AppstoreOutlined />}
                  >
                    Хранилище
                  </Button>
                </Link>
                <Link from="/" to="/">
                  <Button size="large" icon={<UserOutlined />}>
                    Войти в профиль
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
