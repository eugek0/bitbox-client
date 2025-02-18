import { createFileRoute } from "@tanstack/react-router";
import { protectedRoute } from "@/core/router";
import AsideLayoutContainer from "@/containers/Layouts/AsideLayoutContainer";
import HomePage from "@/modules/HomePage";

export const Route = createFileRoute("/")({
  beforeLoad: protectedRoute(),
  component: () => (
    <AsideLayoutContainer>
      <title>Список хранилищ</title>
      <HomePage />
    </AsideLayoutContainer>
  ),
});
