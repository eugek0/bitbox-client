import { IRouterContext } from "@/core/types";
import NotFoundPage from "@/modules/NotFoundPage";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Layout } from "antd";

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  notFoundComponent: NotFoundPage,
});
