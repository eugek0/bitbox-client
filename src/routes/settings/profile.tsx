import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import SettingsLayoutContainer from "@/containers/Layouts/SettingsLayoutContainer";
import { protectedRoute } from "@/core/router";
import ProfileSettingsPage from "@/modules/Settings/ProfileSettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/profile")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <SettingsLayoutContainer>
        <title>Настройки профиля</title>
        <ProfileSettingsPage />
      </SettingsLayoutContainer>
    </AsideLayoutContainer>
  ),
});
