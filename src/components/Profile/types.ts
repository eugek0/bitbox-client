import { IProfile } from "@/containers/Auth/types";
import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";
import { Nullable } from "@/core/types";

export interface ProfileProps {
  profile: Nullable<IProfile>;
  storages: IStoragesTableRecord[];
  isMyProfile?: boolean;
}
