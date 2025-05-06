import { CopyOutlined, EditOutlined } from "@ant-design/icons";
import { IoCutOutline } from "react-icons/io5";

export const ENTITY_DOWNLOAD_DROPDOWN_ITEMS = (
  handlers: Record<string, () => void>,
  maintainer: boolean,
): any[] => [
  ...(maintainer
    ? [
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
      ]
    : []),
  {
    key: "copy",
    label: "Скопировать",
    icon: <CopyOutlined />,
    onClick: handlers["copy"],
  },
  ...(maintainer
    ? [
        {
          key: "cut",
          label: "Вырезать",
          icon: <IoCutOutline />,
          onClick: handlers["cut"],
        },
      ]
    : []),
];
