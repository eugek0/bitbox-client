import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import SettingsLayoutContainer from "@/containers/Layouts/SettingsLayoutContainer";
import { protectedRoute } from "@/core/router";
import DevelopmentSettingsPage from "@/modules/Settings/DevelopmentSettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/development")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <SettingsLayoutContainer>
        <title>Разработка</title>
        <DevelopmentSettingsPage />
      </SettingsLayoutContainer>
    </AsideLayoutContainer>
  ),
});
