import { TRole } from "@/containers/Auth/types";

export const SETTINGS_LAYOUT_PERMISSIONS: Record<string, TRole[]> = {
  "/settings/profile": ["owner", "administrator", "developer", "user"],
  "/settings/security": ["owner", "administrator", "developer", "user"],
  "/settings/development": ["owner", "administrator", "developer"],
  "/settings/administration": ["owner", "administrator"],
};
