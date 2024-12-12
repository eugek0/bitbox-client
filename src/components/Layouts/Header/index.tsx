import { FC } from "react";
import { Flex, Typography } from "antd";
import { Link } from "@tanstack/react-router";
import Logotype from "@/components/Common/Logotype";
import ProfileAvatarContainer from "@/containers/Common/ProfileAvatarContainer";
import { APP_NAME } from "@/core/constants";
import styles from "./styles.module.scss";

const Header: FC = () => {
  return (
    <header className={styles["body"]}>
      <Flex justify="space-between" align="center">
        <Link className={styles["logotype-container"]} to="/">
          <Logotype />
          <Typography.Text className={styles["app-name"]}>
            {APP_NAME}
          </Typography.Text>
        </Link>
        <ProfileAvatarContainer />
      </Flex>
    </header>
  );
};

export default Header;
