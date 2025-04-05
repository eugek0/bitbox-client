import { IStorageMember } from "@/containers/Storages/types";

export interface StorageMemberRolesProps {
  value?: IStorageMember[];
  readOnly?: boolean;
  onChange?: (value: IStorageMember[]) => void;
}
