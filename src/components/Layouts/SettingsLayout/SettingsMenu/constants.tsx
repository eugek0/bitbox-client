import { TRole } from "@/containers/Auth/types";
import {
  CodeOutlined,
  CrownOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

export const SETTINGS_MENU_ITEMS = (
  role?: TRole,
  handlers?: Record<string, () => void>,
): MenuProps["items"] => [
  {
    key: "profile",
    label: "Профиль",
    icon: <UserOutlined />,
    onClick: handlers?.profile,
  },
  {
    key: "security",
    label: "Безопасность",
    icon: <LockOutlined />,
    onClick: handlers?.security,
  },
  {
    key: "development",
    label: "Разработка",
    icon: <CodeOutlined />,
    onClick: handlers?.development,
  },
  ...(role === "admin"
    ? [
        {
          key: "administration",
          label: "Администрирование",
          icon: <CrownOutlined />,
          onClick: handlers?.administration,
        },
      ]
    : []),
];
