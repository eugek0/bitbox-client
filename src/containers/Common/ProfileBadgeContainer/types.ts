import { ProfileBadgeProps } from "@/components/Common/ProfileBadge/types";

export interface ProfileBadgeContainerProps
  extends Pick<ProfileBadgeProps, "size" | "subtitle"> {
  _id?: string;
  email?: string;
  login?: string;
}
