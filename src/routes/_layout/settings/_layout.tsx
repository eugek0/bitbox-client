import SettingsLayoutContainer from "@/containers/Layouts/SettingsLayoutContainer";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/settings/_layout")({
  component: () => (
    <SettingsLayoutContainer>
      <Outlet />
    </SettingsLayoutContainer>
  ),
});
