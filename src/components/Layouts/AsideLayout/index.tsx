import { FC } from "react";
import { Avatar, Flex, Layout, Menu, Typography } from "antd";
import {
  FileTextOutlined,
  HddFilled,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Logotype from "@/components/Common/Logotype";
import { APP_NAME } from "@/core/constants";
import { AsideLayoutProps } from "./types";
import styles from "./styles.module.scss";

const AsideLayout: FC<AsideLayoutProps> = ({
  children,
  collapsed,
  profile,
  menuSelectedKeys,
  clickHandlers,
  handleChangeCollapsed,
  handleLogout,
}) => {
  return (
    <Layout>
      <Layout.Sider
        className={styles["sider"]}
        onCollapse={handleChangeCollapsed}
        collapsed={collapsed}
        collapsible
      >
        <Flex
          className={styles["sider__content"]}
          justify="space-between"
          vertical
        >
          <div>
            <Flex
              className={`${styles["collapser"]} ${collapsed ? styles["collapser_closed"] : ""}`}
              align="center"
              gap={10}
            >
              <Logotype />
              <Typography.Text
                className={`${styles["collapser__text"]} ${collapsed ? styles["collapser__text_closed"] : ""}`}
              >
                {APP_NAME}
              </Typography.Text>
            </Flex>
            <Menu
              selectedKeys={menuSelectedKeys}
              items={[
                {
                  key: "storages",
                  label: "Список хранилищ",
                  icon: <HddFilled />,
                  onClick: clickHandlers["storages"],
                },
              ]}
            />
          </div>
          <Menu
            selectedKeys={menuSelectedKeys}
            items={[
              {
                key: "api",
                label: "API документация",
                icon: <FileTextOutlined />,
                onClick: clickHandlers["api"],
              },
              {
                key: "settings",
                label: "Настройки",
                icon: <SettingOutlined />,
              },
              {
                key: "profile",
                label: "Профиль",
                icon: <UserOutlined />,
                children: [
                  {
                    key: "account",
                    label: (
                      <Flex vertical gap={2}>
                        <span className={styles["profile-submenu__login"]}>
                          {profile?.login}
                        </span>
                        <span className={styles["profile-submenu__email"]}>
                          {profile?.email}
                        </span>
                      </Flex>
                    ),
                    icon: <Avatar src={profile?.avatar} />,
                    className: styles["profile-submenu"],
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: "profile-settings",
                    label: "Настройки",
                    icon: <SettingOutlined />,
                  },
                  {
                    key: "logout",
                    label: "Выйти",
                    icon: <LogoutOutlined />,
                    onClick: handleLogout,
                  },
                ],
              },
            ]}
          />
        </Flex>
      </Layout.Sider>
      {children}
    </Layout>
  );
};

export default AsideLayout;
