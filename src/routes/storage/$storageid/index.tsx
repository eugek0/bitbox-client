import { createFileRoute } from "@tanstack/react-router";
import { protectedRoute } from "@/core/router";
import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import StoragePage from "@/modules/StoragePage";
import StorageLayoutContainer from "@/containers/Layouts/StorageLayoutContainer";

export const Route = createFileRoute("/storage/$storageid/")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <StorageLayoutContainer>
        <title>Хранилище</title>
        <StoragePage />
      </StorageLayoutContainer>
    </AsideLayoutContainer>
  ),
});
