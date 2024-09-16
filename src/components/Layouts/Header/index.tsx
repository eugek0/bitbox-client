import Logotype from "@/components/Common/Logotype";
import ProfileAvatarContainer from "@/containers/Common/ProfileAvatarContainer";
import { APP_NAME } from "@/core/constants";
import { AppstoreOutlined, LoginOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Button, Flex, Tooltip, Typography } from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";
import { HeaderProps } from "./types";

const Header: FC<HeaderProps> = ({ profile }) => {
  return (
    <header className={styles["body"]}>
      <Flex justify="space-between" align="center">
        <Flex gap={10} align="center">
          <Logotype />
          <Typography.Text className={styles["app-name"]}>
            {APP_NAME}
          </Typography.Text>
        </Flex>
        {profile ? (
          <Flex gap={20} align="center">
            <Tooltip title="Хранилище" placement="bottomLeft">
              <Link>
                <Button icon={<AppstoreOutlined />} />
              </Link>
            </Tooltip>
            <ProfileAvatarContainer />
          </Flex>
        ) : (
          <Flex gap={20} align="center">
            <Link to="/auth/login">
              <Button icon={<LoginOutlined />}>Войти</Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </header>
  );
};

export default Header;
