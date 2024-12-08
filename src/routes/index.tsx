import { protectedRoute } from "@/core/router";
import HomePage from "@/modules/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: protectedRoute(),
  component: HomePage,
});
