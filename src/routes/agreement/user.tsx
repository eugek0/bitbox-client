import UserAgreementPage from "@/modules/Agreement/UserAgreementPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agreement/user")({
  component: () => (
    <>
      <title>Пользовательское соглашение</title>
      <UserAgreementPage />
    </>
  ),
});
