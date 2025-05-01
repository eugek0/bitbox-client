import { createFileRoute } from "@tanstack/react-router";
import RecoverPasswordPage from "@/modules/Auth/RecoverPasswordPage";
import { protectedRoute } from "@/core/router";

export const Route = createFileRoute("/auth/recover/$userid")({
  beforeLoad: protectedRoute(true),
  component: () => (
    <>
      <title>Восстановление пароля</title>
      <RecoverPasswordPage />
    </>
  ),
  validateSearch: (search) => ({
    token: search.token as string,
  }),
});
