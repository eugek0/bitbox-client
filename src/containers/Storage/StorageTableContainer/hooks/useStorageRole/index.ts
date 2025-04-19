import { profileSelector } from "@/containers/Auth/selectors";
import {
  IStorageMember,
  TStorageMemberRole,
} from "@/containers/Storages/types";
import { useAppSelector } from "@/store";
import { useMemo } from "react";

export const useStorageRole = (
  members: IStorageMember[],
): TStorageMemberRole => {
  const profile = useAppSelector(profileSelector);

  const role = useMemo(
    () =>
      profile?.role === "admin"
        ? "administrator"
        : members.find((member) => member._id === profile?._id)?.role,
    [profile, members],
  );

  return role ?? "watcher";
};
