import { TRole } from "@/containers/Auth/types";

export interface SettingsMenuProps {
  role?: TRole;
  activeItem?: string;
  handlers?: Record<string, () => void>;
}
