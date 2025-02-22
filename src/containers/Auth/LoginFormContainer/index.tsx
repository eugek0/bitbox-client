import { FC, useEffect } from "react";
import LoginForm from "@/components/Auth/AuthForm/LoginForm";
import { useLazyGetProfileQuery, useLoginMutation } from "../api";
import { isFormException } from "@/core/typeguards";
import { setErrorsToField } from "@/core/utils/form";
import { useNavigate } from "@tanstack/react-router";
import { FormProps, useForm } from "antd/es/form/Form";
import { ILoginPayload } from "../types";

const LoginFormContainer: FC = () => {
  const [form] = useForm<ILoginPayload>();
  const navigate = useNavigate({ from: "/auth/login" });

  const [login, { isLoading }] = useLoginMutation();
  const [getProfile, { data: profile }] = useLazyGetProfileQuery();

  const onFinish: FormProps<ILoginPayload>["onFinish"] = async (values) => {
    try {
      await login(values).unwrap();
      await getProfile().unwrap();
    } catch (error) {
      if (isFormException(error)) {
        return setErrorsToField(form, error);
      }
      throw error;
    }
  };

  useEffect(() => {
    if (profile) {
      navigate({ to: "/", replace: true });
    }
  }, [profile]);

  return (
    <LoginForm
      redirectButton={{
        show: true,
        link: "/auth/register",
        text: "Еще нет аккаунта?",
      }}
      loading={isLoading}
      onFinish={onFinish}
      form={form}
    />
  );
};

export default LoginFormContainer;
