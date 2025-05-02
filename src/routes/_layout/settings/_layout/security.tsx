import { protectedRoute } from "@/core/router";
import SecuritySettingsPage from "@/modules/Settings/SecuritySettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/settings/_layout/security")({
  beforeLoad: protectedRoute(),
  component: () => (
    <>
      <title>Настройки безопасности</title>
      <SecuritySettingsPage />
    </>
  ),
});
