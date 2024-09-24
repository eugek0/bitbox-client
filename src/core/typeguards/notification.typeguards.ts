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
  unknown.notification &&
  typeof unknown.notification === "object" &&
  isNotificationStatusType(unknown.notification.status) &&
  typeof unknown.notification.config === "object" &&
  typeof unknown.notification.config.message === "string" &&
  (typeof unknown.notification.config.description === "undefined" ||
    typeof unknown.notification.config.description === "string") &&
  (typeof unknown.notification.config.closable === "undefined" ||
    typeof unknown.notification.config.closable === "boolean") &&
  (typeof unknown.notification.config.duration === "undefined" ||
    typeof unknown.notification.config.duration === "number") &&
  (typeof unknown.notification.config.placement === "undefined" ||
    isNotificationPlacement(unknown.notification.config.placement));
