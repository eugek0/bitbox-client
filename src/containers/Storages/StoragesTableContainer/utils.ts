import { IProfile } from "@/containers/Auth/types";
import { BitBoxTableRecord } from "@/containers/Common/BitBoxTableContainer/types";
import { NotificationInstance } from "antd/es/notification/interface";

export const checkStorageAccess = (
  profile: IProfile,
  record: BitBoxTableRecord,
  selected: BitBoxTableRecord[],
  notify: NotificationInstance,
): boolean => {
  const checkOwnership = (record: BitBoxTableRecord) =>
    profile.role === "admin" || record.owner === profile._id;

  const result =
    selected.length > 1
      ? selected.every(checkOwnership)
      : checkOwnership(record);

  if (!result) {
    notify.error({
      placement: "bottomRight",
      message: "Отказ в доступе",
      description: `У вас недостаточно прав, чтобы производить действия над ${selected.length > 1 ? "одним из выбранных хранилищ" : "этим хранилищем"}`,
    });
  }

  return result;
};
