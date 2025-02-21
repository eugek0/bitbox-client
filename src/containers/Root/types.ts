import { INotification, Nullable } from "@/core/types";

export interface IRootState {
  notification: Nullable<INotification["notification"]>;
}

export interface IAppStatus {
  virgin: boolean;
}
