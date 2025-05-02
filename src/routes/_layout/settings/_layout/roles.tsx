import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings/_layout/roles')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/settings/_layout/roles"!</div>
}
