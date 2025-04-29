import SettingsLayout from "@/components/Layouts/SettingsLayout";
import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import { protectedRoute } from "@/core/router";
import ProfileSettingsPage from "@/modules/SettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/profile")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <SettingsLayout>
        <ProfileSettingsPage />
      </SettingsLayout>
    </AsideLayoutContainer>
  ),
});
