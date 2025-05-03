import { FC } from "react";
import LogsTable from "@/components/Settings/LogsSettings/LogsTable";
import { useGetLogsQuery } from "../api";

const LogsTableContainer: FC = () => {
  const { data: logs, isFetching: isLogsFetching } = useGetLogsQuery();

  return <LogsTable logs={logs ?? []} loading={isLogsFetching} />;
};

export default LogsTableContainer;
