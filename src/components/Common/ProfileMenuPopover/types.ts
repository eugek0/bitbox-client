import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";
import { MouseEventHandler } from "react";

export interface ProfileMenuPopoverProps {
  profile: Nullable<IProfile>;
  handleLogout: MouseEventHandler<HTMLButtonElement>;
  handleClickSettings: MouseEventHandler<HTMLButtonElement>;
}
