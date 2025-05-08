import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";
import { ILog } from "@/containers/Settings/LogsSettingsContainer/types";
import { TableColumnType } from "antd";
import moment from "moment";

export const LOGS_TABLE_COLUMNS: TableColumnType<ILog>[] = [
  {
    title: "Пользователь",
    dataIndex: "user",
    render: (_id) => {
      return <ProfileBadgeContainer _id={_id} />;
    },
    sorter: {
      compare: (a, b) => b.user?.localeCompare(a.user ?? "") ?? -1,
    },
    showSorterTooltip: false,
    width: "20%",
  },
  {
    title: "Дата и время",
    dataIndex: "createdAt",
    render: (date) => {
      return date ? moment(date).format("DD.MM.YYYY HH:mm:ss") : "";
    },
    sorter: {
      compare: (a, b) =>
        moment(a.createdAt).isAfter(moment(b.createdAt)) ? 1 : -1,
    },
    showSorterTooltip: false,
    width: "170px",
  },
  {
    title: "Метод",
    dataIndex: "method",
    width: "100px",
    sorter: {
      compare: (a, b) => b.method.localeCompare(a.method),
    },
    showSorterTooltip: false,
  },
  {
    title: "URL",
    dataIndex: "url",
    sorter: {
      compare: (a, b) => b.url.localeCompare(a.url),
    },
    showSorterTooltip: false,
  },
  {
    title: "Тип токена",
    dataIndex: "type",
    render: (type: string) => {
      return { user: "Пользователь", pubapi: "Разработчик" }[type];
    },
    width: "140px",
    sorter: {
      compare: (a, b) => b.type?.localeCompare(a.type ?? "") ?? -1,
    },
    showSorterTooltip: false,
  },
];
