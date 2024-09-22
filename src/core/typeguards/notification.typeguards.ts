import { NotificationPlacement } from "antd/es/notification/interface";
import {
  INotification,
  NotificationStatusType,
} from "../types/notification.types";

export const isNotificationStatusType = (
  unknown: any,
): unknown is NotificationStatusType =>
  ["info", "error", "success", "warning"].includes(unknown);

export const isNotificationPlacement = (
  unknown: any,
): unknown is NotificationPlacement =>
  [
    "top",
    "bottom",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
  ].includes(unknown);

export const isNotification = (unknown: any): unknown is INotification =>
  unknown &&
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
    isNotificationPlacement(unknown.config.placement));
