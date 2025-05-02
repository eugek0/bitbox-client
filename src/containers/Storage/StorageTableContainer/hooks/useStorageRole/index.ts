import { profileSelector } from "@/containers/Auth/selectors";
import { TRole } from "@/containers/Auth/types";
import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";
import { TStorageMemberRole } from "@/containers/Storages/types";
import { Nullable } from "@/core/types";
import { useAppSelector } from "@/store";

export const useStorageRole = (
  storage?: Nullable<Partial<IStoragesTableRecord>>,
): TStorageMemberRole => {
  const profile = useAppSelector(profileSelector);

  const role =
    storage?.defaultRole !== "watcher" ||
    (["administrator", "owner"] as TRole[]).includes(profile?.role ?? "user") ||
    profile?._id === storage?.owner
      ? "administrator"
      : storage?.members?.find((member) => member._id === profile?._id)?.role;

  return role ?? "watcher";
};
