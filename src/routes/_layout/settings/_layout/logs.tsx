import { createFileRoute } from "@tanstack/react-router";
import LogsSettingsPage from "@/modules/Settings/LogsSettingsPage";
import { protectedRoute } from "@/core/router";

export const Route = createFileRoute("/_layout/settings/_layout/logs")({
  beforeLoad: protectedRoute(),
  component: () => (
    <>
      <LogsSettingsPage />
      <title>Журнал действий</title>
    </>
  ),
});
