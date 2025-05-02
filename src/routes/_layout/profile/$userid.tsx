import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/profile/$userid")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/profile/"!</div>;
}
