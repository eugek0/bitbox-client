import { IRouterContext } from "@/core/types";
import { FileRoutesByPath } from "@tanstack/react-router";

export type ProtectedRouteType = (
  authenticated?: boolean,
  redirectTo?: keyof FileRoutesByPath,
) => (ctx: { context: IRouterContext }) => any | Promise<any>;
