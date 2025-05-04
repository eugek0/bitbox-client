import { createFileRoute } from "@tanstack/react-router";
import { protectedRoute } from "@/core/router";
import ProfilePage from "@/modules/ProfilePage";

export const Route = createFileRoute("/_layout/profile/$userid")({
  beforeLoad: protectedRoute(),
  component: () => (
    <>
      <title>Профиль</title>
      <ProfilePage />
    </>
  ),
});
