import { FC, PropsWithChildren } from "react";
import { Button, Flex } from "antd";
import Header from "../Header";
import ProfileSettingsBadge from "@/containers/Settings/ProfileSettingsBadge";
import SettingsMenuContainer from "@/containers/Layouts/SettingsLayoutContainer/SettingsMenuContainer";
import styles from "./styles.module.scss";
import { UserOutlined } from "@ant-design/icons";

const SettingsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex className={styles["body"]} gap={10} vertical>
      <Header>Настройки</Header>
      <Flex justify="center">
        <Flex className={styles["wrapper"]} gap={15} vertical>
          <Flex justify="space-between" align="center">
            <ProfileSettingsBadge />
            <Button icon={<UserOutlined />}>Перейти в профиль</Button>
          </Flex>
          <Flex gap={40}>
            <SettingsMenuContainer />
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SettingsLayout;
