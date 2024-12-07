import StarterLogin from "@/components/Starter/StarterLogin";
import { starterRoute } from "@/containers/Starter/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/starter/login")({
  beforeLoad: starterRoute(),
  component: StarterLogin,
});
