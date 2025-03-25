import { createFileRoute } from "@tanstack/react-router";
import { protectedRoute } from "@/core/router";
import StorageFilePage from "@/modules/StorageFilePage";

export const Route = createFileRoute("/storage/$storageid/file/$fileid")({
  beforeLoad: protectedRoute(),
  component: StorageFilePage,
});
