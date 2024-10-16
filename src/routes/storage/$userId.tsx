import StoragePageContainer from "@/containers/Storage/StoragePageContainer";
import { protectedRoute } from "@/core/router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/storage/$userId")({
  beforeLoad: protectedRoute(),
  component: StoragePageContainer,
});

