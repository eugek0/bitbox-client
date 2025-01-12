import { protectedRoute } from "@/core/router";
import RegisterPage from "@/modules/Auth/RegisterPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  beforeLoad: protectedRoute(true),
  component: () => (
    <>
      <title>Регистрация</title>
      <RegisterPage />
    </>
  ),
});
