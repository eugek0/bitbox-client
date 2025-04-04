import { IStorageMember } from "@/containers/Storages/types";

export interface StorageMemberRolesProps {
  value?: IStorageMember[];
  onChange?: (value: IStorageMember[]) => void;
}
