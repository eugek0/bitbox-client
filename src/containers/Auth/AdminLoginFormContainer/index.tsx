import { FC } from "react";
import { useAdminLoginMutation, useLazyGetProfileQuery } from "../api";
import LoginForm from "@/components/Auth/AuthForm/LoginForm";
import { FormProps, useForm } from "antd/es/form/Form";
import { useNavigate } from "@tanstack/react-router";
import { isFormException } from "@/core/typeguards";
import { setErrorsToField } from "@/core/utils";
import { ILoginPayload } from "../types";
import { AdminLoginContainerProps } from "./types";

const AdminLoginContainer: FC<AdminLoginContainerProps> = ({ redirectTo }) => {
  const [form] = useForm<ILoginPayload>();
  const navigate = useNavigate();

  const [adminLogin] = useAdminLoginMutation();
  const [getProfile] = useLazyGetProfileQuery();

  const handleFinish: FormProps<ILoginPayload>["onFinish"] = async (values) => {
    try {
      await adminLogin(values).unwrap();
      await getProfile().unwrap();
      navigate({ to: redirectTo ?? "/" });
    } catch (error) {
      if (isFormException(error)) {
        return setErrorsToField(form, error);
      }
      throw error;
    }
  };

  return <LoginForm form={form} onFinish={handleFinish} />;
};

export default AdminLoginContainer;