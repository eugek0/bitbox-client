import { createFileRoute } from "@tanstack/react-router";
import { protectedRoute } from "@/core/router";
import StoragesPage from "@/modules/StoragesPage";

export const Route = createFileRoute("/_layout/")({
  beforeLoad: protectedRoute(),
  component: () => (
    <>
      <title>Список хранилищ</title>
      <StoragesPage />
    </>
  ),
});
