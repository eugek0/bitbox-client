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
    width: "20%",
  },
  {
    title: "Дата и время",
    dataIndex: "createdAt",
    render: (date) => {
      return date ? moment(date).format("DD.MM.YYYY HH:mm:ss") : "";
    },
    width: "170px",
  },
  {
    title: "Метод",
    dataIndex: "method",
    width: "100px",
  },
  {
    title: "URL",
    dataIndex: "url",
  },
  {
    title: "Тип токена",
    dataIndex: "type",
    render: (type: string) => {
      return { user: "Пользователь", pubapi: "Разработчик" }[type];
    },
    width: "140px",
  },
];
