import { FC } from "react";
import styles from "./styles.module.scss";
import { HeaderProps } from "./types";
import { Typography } from "antd";

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className={styles["body"]}>
      <Typography.Title className={styles["title"]} level={4}>
        {children}
      </Typography.Title>
    </header>
  );
};

export default Header;
