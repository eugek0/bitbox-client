import { profileSelector } from "@/containers/Auth/selectors";
import {
  IStorageMember,
  TStorageMemberRole,
} from "@/containers/Storages/types";
import { useAppSelector } from "@/store";

export const useStorageRole = (
  members: IStorageMember[],
  defaultRole?: TStorageMemberRole,
): TStorageMemberRole => {
  const profile = useAppSelector(profileSelector);

  const role =
    defaultRole !== "watcher" || profile?.role === "admin"
      ? "administrator"
      : members.find((member) => member._id === profile?._id)?.role;

  return role ?? "watcher";
};
