import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/storage/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/storage/$id"!</div>;
}
