import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";

export interface HeaderProps {
  profile: Nullable<IProfile>;
}
