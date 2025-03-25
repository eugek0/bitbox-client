import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Layout } from "antd";
import NotFoundPage from "@/modules/NotFoundPage";
import { IRouterContext } from "@/core/types";

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  notFoundComponent: NotFoundPage,
});
