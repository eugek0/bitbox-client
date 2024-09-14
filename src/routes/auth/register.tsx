import RegisterPage from "@/modules/Auth/RegisterPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

