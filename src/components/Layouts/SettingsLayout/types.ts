import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";
import { PropsWithChildren } from "react";

export interface SettingsLayoutProps extends PropsWithChildren {
  profile: Nullable<IProfile>;
}
