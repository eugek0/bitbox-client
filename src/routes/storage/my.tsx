import { createFileRoute } from "@tanstack/react-router";
import StoragePage from "@/modules/StoragePage";

export const Route = createFileRoute("/storage/my")({
  component: StoragePage,
});
