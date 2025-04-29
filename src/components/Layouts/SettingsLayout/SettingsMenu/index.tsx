import { FC } from "react";
import { Menu } from "antd";
import { SETTINGS_MENU_ITEMS } from "./constants";
import styles from "./styles.module.scss";
import { SettingsMenuProps } from "./types";

const SettingsMenu: FC<SettingsMenuProps> = ({ role, activeItem }) => {
  return (
    <Menu
      className={styles["body"]}
      selectedKeys={activeItem ? [activeItem] : []}
      items={SETTINGS_MENU_ITEMS(role)}
    />
  );
};

export default SettingsMenu;
