import { protectedRoute } from "@/core/router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_layout/settings/_layout/administration",
)({
  beforeLoad: protectedRoute(),
  component: () => (
    <>
      <title>Администрирование</title>
      <></>
    </>
  ),
});
