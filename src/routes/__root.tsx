import { IRouterContext } from "@/core/types";
import NotFoundPage from "@/modules/NotFoundPage";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: Outlet,
  notFoundComponent: NotFoundPage,
});
