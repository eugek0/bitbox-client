import ConfidentialityAgreementPage from "@/modules/Agreement/ConfidentialityAgreementPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agreement/confidentiality")({
  component: () => (
    <>
      <title>Политика конфиденциальности</title>
      <ConfidentialityAgreementPage />
    </>
  ),
});
