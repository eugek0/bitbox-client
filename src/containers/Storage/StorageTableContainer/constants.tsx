import { Flex, TableColumnType, Typography } from "antd";
import { convertBytes } from "@/core/utils";
import { EntityType, IEntity } from "../types";
import { ReactNode } from "react";
import { FileFilled, FolderFilled } from "@ant-design/icons";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";

export const STORAGE_TABLE_ENTITY_TYPE_ICONS: Record<EntityType, ReactNode> = {
  file: <FileFilled />,
  directory: <FolderFilled />,
};

export const STORAGE_TABLE_COLUMNS: TableColumnType<IEntity>[] = [
  {
    title: "Название",
    dataIndex: "fullname",
    width: "25%",
    ellipsis: true,
    sorter: {
      compare: (a, b) => b.name.localeCompare(a.name),
    },
    showSorterTooltip: false,
    render: (name, record) => {
      return (
        <Flex align="center" gap={10}>
          {STORAGE_TABLE_ENTITY_TYPE_ICONS[record.type]}
          <Typography.Text>{name}</Typography.Text>
        </Flex>
      );
    },
  },
  {
    title: "Загрузил",
    dataIndex: "uploader",
    width: "4%",
    sorter: {
      compare: (a, b) => b.uploader.localeCompare(a.uploader),
    },
    showSorterTooltip: false,
    render: (uploader) => <ProfileBadgeContainer _id={uploader} />,
  },
  {
    title: "Размер",
    dataIndex: "size",
    width: "6.25%",
    sorter: {
      compare: (a, b) => a.size - b.size,
    },
    showSorterTooltip: false,
    render: (size) => convertBytes(size ?? 0),
  },
];
