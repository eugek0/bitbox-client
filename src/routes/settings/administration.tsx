import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import SettingsLayoutContainer from "@/containers/Layouts/SettingsLayoutContainer";
import { protectedRoute } from "@/core/router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/administration")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <SettingsLayoutContainer>
        <title>Администрирование</title>
        <></>
      </SettingsLayoutContainer>
    </AsideLayoutContainer>
  ),
});
