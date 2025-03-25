import { createFileRoute } from "@tanstack/react-router";
import { protectedRoute } from "@/core/router";
import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import StoragePage from "@/modules/StoragePage";

export const Route = createFileRoute("/storage/$storageid/")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <title>Хранилище</title>
      <StoragePage />
    </AsideLayoutContainer>
  ),
});
