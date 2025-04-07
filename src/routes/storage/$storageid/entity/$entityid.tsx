import { createFileRoute } from "@tanstack/react-router";
import { protectedRoute } from "@/core/router";
import StorageFilePage from "@/modules/StorageFilePage";
import StorageLayoutContainer from "@/containers/Layouts/StorageLayoutContainer";

export const Route = createFileRoute("/storage/$storageid/entity/$entityid")({
  beforeLoad: protectedRoute(),
  component: () => (
    <StorageLayoutContainer>
      <StorageFilePage />
    </StorageLayoutContainer>
  ),
});
