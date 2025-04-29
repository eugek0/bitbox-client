import { TRole } from "@/containers/Auth/types";
import {
  CodeOutlined,
  CrownOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

export const SETTINGS_MENU_ITEMS = (role?: TRole): MenuProps["items"] => [
  {
    key: "profile",
    label: "Профиль",
    icon: <UserOutlined />,
  },
  {
    key: "security",
    label: "Безопасность",
    icon: <LockOutlined />,
  },
  {
    key: "development",
    label: "Разработка",
    icon: <CodeOutlined />,
  },
  ...(role === "admin"
    ? [
        {
          key: "administration",
          label: "Администрирование",
          icon: <CrownOutlined />,
        },
      ]
    : []),
];
