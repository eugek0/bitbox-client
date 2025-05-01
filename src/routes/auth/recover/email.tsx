import RecoverEmailPage from "@/modules/Auth/RecoverEmailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/recover/email")({
  component: () => (
    <>
      <title>Восстановление пароля</title>
      <RecoverEmailPage />
    </>
  ),
});
