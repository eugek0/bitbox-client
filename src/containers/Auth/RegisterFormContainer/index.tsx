import RegisterForm from "@/components/Auth/AuthForm/RegisterForm";
import { FormProps, useForm } from "antd/es/form/Form";
import { FC } from "react";
import { useRegisterMutation } from "../api";
import { IRegisterFormValues } from "./types";

const RegisterFormContainer: FC = () => {
  const [form] = useForm();
  const [register] = useRegisterMutation();

  const onFinish: FormProps<IRegisterFormValues>["onFinish"] = (values) => {
    register(values);
  };

  return <RegisterForm form={form} onFinish={onFinish} />;
};

export default RegisterFormContainer;
