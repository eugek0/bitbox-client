import { createFileRoute } from "@tanstack/react-router";
import RolesSettingsPage from "@/modules/Settings/RolesSettingsPage";
import { protectedRoute } from "@/core/router";

export const Route = createFileRoute("/_layout/settings/_layout/roles")({
  beforeLoad: protectedRoute(),
  component: () => (
    <>
      <title>Выдача ролей</title>
      <RolesSettingsPage />
    </>
  ),
});
