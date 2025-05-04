import { FC } from "react";
import { Button, Flex } from "antd";
import Header from "../Header";
import ProfileSettingsBadge from "@/containers/Settings/ProfileSettingsBadge";
import SettingsMenuContainer from "@/containers/Layouts/SettingsLayoutContainer/SettingsMenuContainer";
import styles from "./styles.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { SettingsLayoutProps } from "./types";

const SettingsLayout: FC<SettingsLayoutProps> = ({ children, profile }) => {
  return (
    <Flex className={styles["body"]} gap={10} vertical>
      <Header>Настройки</Header>
      <Flex className={styles["wrapper-container"]} justify="center">
        <Flex className={styles["wrapper"]} gap={15} vertical>
          <Flex justify="space-between" align="center">
            <ProfileSettingsBadge />
            <Link
              to={`/profile/$userid`}
              params={{ userid: profile?._id ?? "" }}
            >
              <Button icon={<UserOutlined />}>Перейти в профиль</Button>
            </Link>
          </Flex>
          <Flex className={styles["content"]} gap={40}>
            <SettingsMenuContainer />
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SettingsLayout;
