import { IProfile } from "@/containers/Auth/types";

export interface ProfileBadgeProps
  extends Partial<Pick<IProfile, "avatar" | "login" | "role">> {
  loading?: boolean;
}
