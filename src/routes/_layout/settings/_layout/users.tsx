import { createFileRoute } from "@tanstack/react-router";
import UsersSettingsPage from "@/modules/Settings/UsersSettingsPage";
import { protectedRoute } from "@/core/router";

export const Route = createFileRoute("/_layout/settings/_layout/users")({
  beforeLoad: protectedRoute(),
  component: () => (
    <>
      <title>Пользователи</title>
      <UsersSettingsPage />
    </>
  ),
});
