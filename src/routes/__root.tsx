import AppModule from "@/modules/App";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: AppModule,
});
