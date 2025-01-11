import { FC, useState } from "react";
import { Flex, Layout, Menu, SiderProps, Typography } from "antd";
import { RiHome4Line } from "react-icons/ri";
import { AsideLayoutProps } from "./types";
import Logotype from "@/components/Common/Logotype";
import { APP_NAME } from "@/core/constants";
import styles from "./styles.module.scss";

const AsideLayout: FC<AsideLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const handleChangeCollapsed: SiderProps["onCollapse"] = (state) => {
    setCollapsed(state);
  };

  return (
    <Layout>
      <Layout.Sider
        className={styles["sider"]}
        onCollapse={handleChangeCollapsed}
        collapsed={collapsed}
        collapsible
      >
        <Flex vertical>
          <Flex
            className={`${styles["header"]} ${collapsed ? styles["header_collapsed"] : ""}`}
            gap={10}
          >
            <Logotype />
            <Typography.Text
              className={`${styles["app-name"]} ${collapsed ? styles["app-name_collapsed"] : ""}`}
            >
              {APP_NAME}
            </Typography.Text>
          </Flex>
          <Menu
            items={[
              {
                type: "divider",
              },
              {
                key: "home",
                label: "Главная",
                icon: <RiHome4Line />,
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
