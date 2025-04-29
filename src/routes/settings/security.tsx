import SettingsLayout from "@/components/Layouts/SettingsLayout";
import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import { protectedRoute } from "@/core/router";
import SecuritySettingsPage from "@/modules/Settings/SecuritySettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/security")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <SettingsLayout>
        <title>Настройки безопасности</title>
        <SecuritySettingsPage />
      </SettingsLayout>
    </AsideLayoutContainer>
  ),
});
