import { TRole } from "@/containers/Auth/types";

export const SETTINGS_LAYOUT_PERMISSIONS: Record<string, TRole[]> = {
  "/settings/profile": ["owner", "administrator", "user"],
  "/settings/security": ["owner", "administrator", "user"],
  "/settings/development": ["owner", "administrator", "user"],
  "/settings/users": ["owner"],
};
