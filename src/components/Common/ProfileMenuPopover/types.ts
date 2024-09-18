import { IProfile } from "@/containers/Auth/types";
import { MouseEventHandler } from "react";

export interface ProfileMenuPopoverProps {
  profile: IProfile;
  handleLogout: MouseEventHandler<HTMLButtonElement>;
}
