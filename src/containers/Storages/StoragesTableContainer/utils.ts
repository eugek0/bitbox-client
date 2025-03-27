import { IProfile } from "@/containers/Auth/types";
import { BitBoxTableRecord } from "@/containers/Common/BitBoxTableContainer/types";

export const checkStorageAccess = (
  profile: IProfile,
  record: BitBoxTableRecord,
  selected: BitBoxTableRecord[],
): boolean => {
  const checkOwnership = (record: BitBoxTableRecord) =>
    profile.role === "admin" || record.owner === profile._id;

  return selected.length > 1
    ? selected.every(checkOwnership)
    : checkOwnership(record);
};
