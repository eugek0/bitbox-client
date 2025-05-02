import { IRouterContext } from "@/core/types";

export type ProtectedRouteType = (
  authenticated?: boolean,
  redirectTo?: string,
) => (ctx: { context: IRouterContext }) => any | Promise<any>;
