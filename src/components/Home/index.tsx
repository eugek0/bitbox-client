import { APP_NAME, APP_SLOGANS } from "@/core/constants";
import { Flex, Typography } from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";
import { sample } from "lodash";
import Logotype from "../Common/Logotype";

const Home: FC = () => {
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
          <Typography.Paragraph className={styles["slogan__paragraph"]}>
            Сервис для быстродоступного и безопасного хранения файлов. Мы
            предоставляем бесплатные 10 гигабайтов хранилища, а также
            всевозможные плюшки для удобства пользователей.
          </Typography.Paragraph>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
