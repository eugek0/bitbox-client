import { FC } from "react";
import { Flex, Typography } from "antd";
import { Link } from "@tanstack/react-router";
import Logotype from "@/components/Common/Logotype";
import ProfileAvatarContainer from "@/containers/Common/ProfileAvatarContainer";
import { APP_NAME } from "@/core/constants";
import styles from "./styles.module.scss";
import { HeaderProps } from "./types";

const Header: FC<HeaderProps> = ({ showLogotype }) => {
  return (
    <header className={styles["body"]}>
      <Flex justify="space-between" align="center">
        {showLogotype ? (
          <Link className={styles["logotype-container"]} to="/">
            <Logotype />
            <Typography.Text className={styles["app-name"]}>
              {APP_NAME}
            </Typography.Text>
          </Link>
        ) : (
          <div />
        )}
        <ProfileAvatarContainer />
      </Flex>
    </header>
  );
};

export default Header;
