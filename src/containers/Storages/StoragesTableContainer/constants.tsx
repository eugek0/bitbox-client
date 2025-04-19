import { Flex, TableColumnType, Typography } from "antd";
import { ProductFilled } from "@ant-design/icons";
import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";
import { convertBytes } from "@/core/utils";
import moment from "moment";

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
    title: "Загружено",
    dataIndex: "createdAt",
    width: "12%",
    sorter: {
      compare: (a, b) =>
        moment(a.createdAt).isAfter(moment(b.createdAt)) ? 1 : -1,
    },
    showSorterTooltip: false,
    render: (createdAt) => moment(createdAt).format("DD.MM.YYYY HH:mm:ss"),
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
    render: (used) => convertBytes(used ?? 0),
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
