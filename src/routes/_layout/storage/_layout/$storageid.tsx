import { createFileRoute } from "@tanstack/react-router";
import { protectedRoute } from "@/core/router";
import StoragePage from "@/modules/StoragePage";

export const Route = createFileRoute("/_layout/storage/_layout/$storageid")({
  beforeLoad: protectedRoute(),
  component: StoragePage,
  validateSearch: (search) => ({
    parent: search.parent as string | undefined,
    entityid: search.entityid as string | undefined,
    page: (search.page as number) || 1,
    limit: search.limit as number | undefined,
  }),
});
