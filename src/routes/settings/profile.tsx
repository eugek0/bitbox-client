import SettingsLayout from "@/components/Layouts/SettingsLayout";
import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import { protectedRoute } from "@/core/router";
import ProfileSettingsPage from "@/modules/Settings/ProfileSettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/profile")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <SettingsLayout>
        <title>Настройки профиля</title>
        <ProfileSettingsPage />
      </SettingsLayout>
    </AsideLayoutContainer>
  ),
});
