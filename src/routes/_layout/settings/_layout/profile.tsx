import { protectedRoute } from "@/core/router";
import ProfileSettingsPage from "@/modules/Settings/ProfileSettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/settings/_layout/profile")({
  beforeLoad: protectedRoute(),
  component: () => (
    <>
      <title>Настройки профиля</title>
      <ProfileSettingsPage />
    </>
  ),
});
