import { IProfile, TRole } from "@/containers/Auth/types";
import { IStorage } from "../types";

export const checkStorageAccess = (
  selected: IStorage[],
  profile?: IProfile,
): boolean => {
  const isAdministrator = (record: IStorage) => {
    const member = record.members?.find(
      (member) => member._id === profile?._id,
    );

    return (
      (["administrator", "owner"] as TRole[]).includes(
        profile?.role ?? "user",
      ) ||
      member?.role === "administrator" ||
      record?.owner === profile?._id ||
      (record?.defaultRole === "administrator" &&
        member?.role !== "watcher" &&
        member?.role !== "maintainer")
    );
  };

  return selected.every(isAdministrator);
};
