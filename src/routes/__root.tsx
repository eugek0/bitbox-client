import { IRouterContext } from "@/core/types";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: Outlet,
});
