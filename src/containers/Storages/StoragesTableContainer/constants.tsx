import { Flex, TableColumnType, Typography } from "antd";
import { ProductFilled } from "@ant-design/icons";
import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";
import { convertBytes } from "@/core/utils";

export const STORAGES_TABLE_COLUMNS: TableColumnType<IStoragesTableRecord>[] = [
  {
    title: "Название",
    dataIndex: "name",
    width: "25%",
    ellipsis: true,
    sorter: {
      compare: (a, b) => b.name.localeCompare(a.name),
    },
    showSorterTooltip: false,
    render: (name) => {
      return (
        <Flex align="center" gap={10}>
          <ProductFilled />
          <Typography.Text>{name}</Typography.Text>
        </Flex>
      );
    },
  },
  {
    title: "Описание",
    dataIndex: "description",
    width: "50%",
    sorter: {
      compare: (a, b) =>
        (b.description ?? "").localeCompare(a.description ?? ""),
    },
    showSorterTooltip: false,
  },
  {
    title: "Владелец",
    dataIndex: "owner",
    width: "12.5%",
    sorter: {
      compare: (a, b) => b.owner.localeCompare(a.owner),
    },
    showSorterTooltip: false,
    render: (owner) => <ProfileBadgeContainer _id={owner} />,
  },
  {
    title: "Занято",
    dataIndex: "used",
    width: "6.25%",
    sorter: {
      compare: (a, b) => a.used - b.used,
    },
    showSorterTooltip: false,
    render: (used) => convertBytes(used),
  },
  {
    title: "Размер",
    dataIndex: "size",
    width: "6.25%",
    sorter: {
      compare: (a, b) => a.size - b.size,
    },
    showSorterTooltip: false,
    render: (size) => convertBytes(size),
  },
];
