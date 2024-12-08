import { FileRoutesByPath } from "@tanstack/react-router";

export interface AdminLoginContainerProps {
  redirectTo?: keyof FileRoutesByPath;
}
