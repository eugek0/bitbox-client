import { createFileRoute } from "@tanstack/react-router";
import RecoverPasswordPage from "@/modules/Auth/RecoverPasswordPage";

export const Route = createFileRoute("/auth/recover/$userid")({
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
