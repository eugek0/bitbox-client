import { MenuProps } from "antd";
import { CopyOutlined, EditOutlined } from "@ant-design/icons";
import { IoCutOutline } from "react-icons/io5";

export const ENTITY_DOWNLOAD_DROPDOWN_ITEMS = (
  handlers: Record<string, () => void>,
): MenuProps["items"] => [
  {
    key: "rename",
    label: "Переименовать",
    icon: <EditOutlined />,
    onClick: handlers["rename"],
  },
  {
    key: "divider",
    type: "divider",
  },
  {
    key: "copy",
    label: "Скопировать",
    icon: <CopyOutlined />,
    onClick: handlers["copy"],
  },
  {
    key: "cut",
    label: "Вырезать",
    icon: <IoCutOutline />,
    onClick: handlers["cut"],
  },
];
