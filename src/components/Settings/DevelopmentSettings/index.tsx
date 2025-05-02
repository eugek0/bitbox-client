import { FC } from "react";
import { Flex, Typography } from "antd";
import styles from "../styles.module.scss";
import DeveloperTokenContainer from "@/containers/Settings/DevelopmentSettingsContainer/DeveloperTokenContainer";

const DevelopmentSettings: FC = () => {
  return (
    <Flex flex={1} gap={15} vertical>
      <Typography.Title className={styles["title"]} level={3}>
        Токен разработчика
      </Typography.Title>
      <DeveloperTokenContainer />
    </Flex>
  );
};

export default DevelopmentSettings;
