import { protectedRoute } from "@/core/router";
import LoginPage from "@/modules/Auth/LoginPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: protectedRoute(true),
  component: LoginPage,
});
