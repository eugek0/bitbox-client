import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import SettingsLayoutContainer from "@/containers/Layouts/SettingsLayoutContainer";
import { protectedRoute } from "@/core/router";
import SecuritySettingsPage from "@/modules/Settings/SecuritySettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/security")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <SettingsLayoutContainer>
        <title>Настройки безопасности</title>
        <SecuritySettingsPage />
      </SettingsLayoutContainer>
    </AsideLayoutContainer>
  ),
});
