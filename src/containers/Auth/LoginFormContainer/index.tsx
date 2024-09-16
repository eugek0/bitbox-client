import LoginForm from "@/components/Auth/AuthForm/LoginForm";
import { isFormException } from "@/core/typeguards";
import { setErrorsToField } from "@/core/utils/form";
import { useNavigate } from "@tanstack/react-router";
import { FormProps, useForm } from "antd/es/form/Form";
import { FC } from "react";
import { useLazyGetProfileQuery, useLoginMutation } from "../api";

const LoginFormContainer: FC = () => {
  const [form] = useForm();
  const navigate = useNavigate({ from: "/auth/login" });

  const [login] = useLoginMutation();
  const [getProfile] = useLazyGetProfileQuery();

  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      await login(values).unwrap();
      await getProfile().unwrap();
      navigate({ to: "/" });
    } catch (error) {
      if (isFormException(error)) {
        return setErrorsToField(form, error);
      }
      throw error;
    }
  };

  return <LoginForm form={form} onFinish={onFinish} />;
};

export default LoginFormContainer;
