import LoginForm from "@/components/Auth/AuthForm/LoginForm";
import { FormProps, useForm } from "antd/es/form/Form";
import { FC } from "react";
import { useLoginMutation } from "../api";

const LoginFormContainer: FC = () => {
  const [form] = useForm();
  const [login] = useLoginMutation();

  const onFinish: FormProps["onFinish"] = (values) => {
    login(values);
  };

  return <LoginForm form={form} onFinish={onFinish} />;
};

export default LoginFormContainer;
