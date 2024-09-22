import { NotificationPlacement } from "antd/es/notification/interface";
import {
  INotification,
  NotificationStatusType,
} from "../types/notification.types";

export function isNotificationStatusType(
  unknown: any,
): unknown is NotificationStatusType {
  return ["info", "error", "success", "warning"].includes(unknown);
}

export function isNotificationPlacement(
  unknown: any,
): unknown is NotificationPlacement {
  return [
    "top",
    "bottom",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
  ].includes(unknown);
}

// Typeguard для INotification
export function isNotification(unknown: any): unknown is INotification {
  return (
    typeof unknown === "object" &&
    isNotificationStatusType(unknown.status) &&
    typeof unknown.config === "object" &&
    typeof unknown.config.message === "string" &&
    (typeof unknown.config.description === "undefined" ||
      typeof unknown.config.description === "string") &&
    (typeof unknown.config.closable === "undefined" ||
      typeof unknown.config.closable === "boolean") &&
    (typeof unknown.config.duration === "undefined" ||
      typeof unknown.config.duration === "number") &&
    (typeof unknown.config.placement === "undefined" ||
      isNotificationPlacement(unknown.config.placement))
  );
}
