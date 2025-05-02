import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: () => (
    <AsideLayoutContainer>
      <Outlet />
    </AsideLayoutContainer>
  ),
});
