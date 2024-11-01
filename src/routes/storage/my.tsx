import MyStoragePageContainer from "@/containers/Storage/MyStoragePageContainer";
import { protectedRoute } from "@/core/router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/storage/my")({
  beforeLoad: protectedRoute(),
  component: MyStoragePageContainer,
});
