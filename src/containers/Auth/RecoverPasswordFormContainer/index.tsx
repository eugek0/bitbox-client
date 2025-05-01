import { FC } from "react";
import RecoverPasswordForm from "@/components/Auth/RecoverForm/RecoverPasswordForm";
import { useForm } from "antd/es/form/Form";
import { IRecoverPasswordFields } from "./types";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useRecoverPasswordMutation } from "../api";

const RecoverPasswordFormContainer: FC = () => {
  const [form] = useForm<IRecoverPasswordFields>();

  const { userid } = useParams({ from: "/auth/recover/$userid" });
  const { token } = useSearch({ from: "/auth/recover/$userid" });
  const navigate = useNavigate();

  const [recoverPassword] = useRecoverPasswordMutation();

  const handleFinish = async ({ password }: IRecoverPasswordFields) => {
    await recoverPassword({
      userid,
      params: { token },
      body: { password },
    });
    navigate({ to: "/auth/login" });
  };

  return <RecoverPasswordForm form={form} onFinish={handleFinish} />;
};

export default RecoverPasswordFormContainer;
