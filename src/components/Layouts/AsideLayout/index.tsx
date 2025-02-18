import { FC } from "react";
import { Avatar, Flex, Layout, Menu, Typography } from "antd";
import { AsideLayoutProps } from "./types";
import Logotype from "@/components/Common/Logotype";
import { APP_NAME } from "@/core/constants";
import styles from "./styles.module.scss";
import { MdStorage } from "react-icons/md";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const AsideLayout: FC<AsideLayoutProps> = ({
  children,
  collapsed,
  profile,
  menuSelectedKeys,
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
                  type: "divider",
                },
                {
                  key: "home",
                  label: "Список хранилищ",
                  icon: <MdStorage />,
                },
              ]}
            />
          </div>
          <Menu
            selectedKeys={menuSelectedKeys}
            items={[
              {
                key: "profile",
                label: "Профиль",
                icon: <UserOutlined />,
                children: [
                  {
                    key: "profile",
                    label: profile?.login,
                    icon: <Avatar src={profile?.avatar} size="small" />,
                    className: styles["profile-submenu"],
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
          {
            // <div
            //   className={`${styles["collapser"]} ${collapsed ? styles["collapser_closed"] : ""}`}
            // >
            //   <Link>
            //     <Flex gap={10} align="center">
            //       <Avatar size="small" src={profile?.avatar} />
            //       <Typography.Text
            //         className={`${styles["collapser__text"]} ${collapsed ? styles["collapser__text_closed"] : ""}`}
            //       >
            //         {profile?.login}
            //       </Typography.Text>
            //     </Flex>
            //   </Link>
            // </div>
          }
        </Flex>
      </Layout.Sider>
      {children}
    </Layout>
  );
};

export default AsideLayout;
