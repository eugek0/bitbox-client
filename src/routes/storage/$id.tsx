import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import StoragePage from "@/modules/StoragePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/storage/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AsideLayoutContainer>
      <title>Хранилище</title>
      <StoragePage />
    </AsideLayoutContainer>
  );
}
