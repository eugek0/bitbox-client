import { NotificationPlacement } from "antd/es/notification/interface";

export type NotificationStatusType = "info" | "error" | "success" | "warning";

export interface INotification {
  notification: {
    status: NotificationStatusType;
    config: {
      message: string;
      description?: string;
      closable?: boolean;
      duration?: number;
      placement?: NotificationPlacement;
    };
  };
}
