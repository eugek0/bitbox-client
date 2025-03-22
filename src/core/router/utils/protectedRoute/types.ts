import { IRouterContext } from "@/core/types";
import { ParseRoute } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";

export type ProtectedRouteType = (
  authenticated?: boolean,
  redirectTo?: ParseRoute<typeof routeTree>["fullPath"],
) => (ctx: { context: IRouterContext }) => any | Promise<any>;
