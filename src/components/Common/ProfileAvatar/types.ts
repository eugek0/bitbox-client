import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";
import { PopoverProps } from "antd";

export interface ProfileAvatarProps {
  profile: Nullable<IProfile>;
  isPopoverOpened: boolean;
  handleTogglePopover: PopoverProps["onOpenChange"];
}
