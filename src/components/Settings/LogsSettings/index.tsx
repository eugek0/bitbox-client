import { FC } from "react";
import { Flex, Typography } from "antd";
import styles from "../styles.module.scss";
import LogsTableContainer from "@/containers/Settings/LogsSettingsContainer/LogsTableContainer";

const LogsSettings: FC = () => {
  return (
    <Flex gap={15} flex={1} vertical>
      <Typography.Title className={styles["title"]} level={3}>
        Журнал действий
      </Typography.Title>
      <LogsTableContainer />
    </Flex>
  );
};

export default LogsSettings;
