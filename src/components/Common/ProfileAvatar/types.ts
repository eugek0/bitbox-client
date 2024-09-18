import { IProfile } from "@/containers/Auth/types";
import { PopoverProps } from "antd";

export interface ProfileAvatarProps {
  profile: IProfile;
  isPopoverOpened: boolean;
  handleTogglePopover: PopoverProps["onOpenChange"];
}
