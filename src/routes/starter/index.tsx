import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/starter/")({
  component: () => <div>Hello /starter/!</div>,
});

