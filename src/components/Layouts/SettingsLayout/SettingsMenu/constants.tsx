import { TRole } from "@/containers/Auth/types";
import {
  AuditOutlined,
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
  ...((["owner", "administrator"] as TRole[]).includes(role ?? "user")
    ? [
        {
          key: "administration",
          label: "Администрирование",
          icon: <CrownOutlined />,
          children: [
            ...((["owner"] as TRole[]).includes(role ?? "user")
              ? [
                  {
                    key: "users",
                    label: "Пользователи",
                    icon: <UserOutlined />,
                    onClick: handlers?.users,
                  },
                ]
              : []),
            {
              key: "logs",
              label: "Журнал действий",
              icon: <AuditOutlined />,
              onClick: handlers?.logs,
            },
          ],
        },
      ]
    : []),
];
