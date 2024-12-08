import { createFileRoute } from "@tanstack/react-router";
import StarterContainer from "@/containers/Starter";
import { starterRoute } from "@/containers/Starter/utils";

export const Route = createFileRoute("/starter/")({
  beforeLoad: starterRoute(),
  component: StarterContainer,
});
