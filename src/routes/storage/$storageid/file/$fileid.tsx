import StorageFilePage from "@/modules/StorageFilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/storage/$storageid/file/$fileid")({
  component: RouteComponent,
});

function RouteComponent() {
  return <StorageFilePage />;
}
