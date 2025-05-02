import { protectedRoute } from "@/core/router";
import DevelopmentSettingsPage from "@/modules/Settings/DevelopmentSettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/settings/_layout/development")({
  beforeLoad: protectedRoute(),
  component: () => (
    <>
      <title>Разработка</title>
      <DevelopmentSettingsPage />
    </>
  ),
});
