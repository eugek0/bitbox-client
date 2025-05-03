import { ILog } from "@/containers/Settings/LogsSettingsContainer/types";

export interface LogsTableProps {
  logs: ILog[];
  loading: boolean;
}
