import AdminLoginContainer from "@/containers/Auth/AdminLoginFormContainer";
import { starterRoute } from "@/containers/Starter/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/starter/login")({
  beforeLoad: starterRoute(),
  component: () => <AdminLoginContainer redirectTo="/starter/" />,
});
