import Logotype from "@/components/Common/Logotype";
import ProfileAvatarContainer from "@/containers/Common/ProfileAvatarContainer";
import { APP_NAME } from "@/core/constants";
import { FormOutlined, LoginOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Button, Flex, Typography } from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";
import { HeaderProps } from "./types";

const Header: FC<HeaderProps> = ({ profile }) => {
  return (
    <header className={styles["body"]}>
      <Flex justify="space-between" align="center">
        <Link className={styles["logotype-container"]} to="/">
          <Logotype />
          <Typography.Text className={styles["app-name"]}>
            {APP_NAME}
          </Typography.Text>
        </Link>
        {profile ? (
          <ProfileAvatarContainer />
        ) : (
          <Flex gap={20} align="center">
            <Link to="/auth/login">
              <Button
                className={styles["auth-button"]}
                type="text"
                icon={<LoginOutlined />}
              >
                Войти
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button icon={<FormOutlined />}>Зарегистрироваться</Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </header>
  );
};

export default Header;
