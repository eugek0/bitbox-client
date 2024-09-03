import { NotificationPlacement } from "antd/es/notification/interface";

export interface INotificationData {
  notification: {
    status: "success" | "warning" | "error" | "info";
    message: string;
    description?: string;
    duration?: number;
    placement?: NotificationPlacement
  };
}
