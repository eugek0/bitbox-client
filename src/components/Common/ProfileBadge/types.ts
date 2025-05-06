import { IProfile } from "@/containers/Auth/types";
import { SizeType } from "@/core/types";

export interface ProfileBadgeProps
  extends Partial<
    Pick<IProfile, "avatar" | "login" | "role" | "name" | "lastname" | "_id">
  > {
  size?: SizeType;
  showFullname?: boolean;
  subtitle?: string;
  loading?: boolean;
}
