import StorageLayoutContainer from "@/containers/Layouts/StorageLayoutContainer";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/storage/_layout")({
  component: () => (
    <StorageLayoutContainer>
      <Outlet />
    </StorageLayoutContainer>
  ),
});
