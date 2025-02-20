import { TableColumnType } from "antd";
import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";

export const STORAGES_TABLE_COLUMNS: TableColumnType<IStoragesTableRecord>[] = [
  {
    title: "Название",
    dataIndex: "name",
    width: "25%",
  },
  {
    title: "Описание",
    dataIndex: "description",
    width: "50%",
  },
  {
    title: "Владелец",
    dataIndex: "owner",
    width: "12.5%",
    render: (record) => <ProfileBadgeContainer _id={record} />,
  },
  {
    title: "Занято",
    dataIndex: "used",
    width: "6.25%",
  },
  {
    title: "Размер",
    dataIndex: "size",
    width: "6.25%",
  },
];
