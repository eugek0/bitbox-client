import { IProfile } from "@/containers/Auth/types";
import { NotificationInstance } from "antd/es/notification/interface";
import { IStorage } from "../types";

export const checkStorageAccess = (
  profile: IProfile,
  record: IStorage,
  selected: IStorage[],
  notify: NotificationInstance,
): boolean => {
  const isMaintainer = (record: IStorage) =>
    profile.role === "admin" ||
    record.owner === profile._id ||
    record.defaultRole === "administrator" ||
    record?.members?.some(
      (member) => member._id === profile._id && member.role === "administrator",
    );

  const result =
    selected.length > 1 ? selected.every(isMaintainer) : isMaintainer(record);

  if (!result) {
    notify.error({
      placement: "bottomRight",
      message: "Отказ в доступе",
      description: `У вас недостаточно прав, чтобы производить действия над ${selected.length > 1 ? "одним из выбранных хранилищ" : "этим хранилищем"}`,
    });
  }

  return result ?? false;
};
