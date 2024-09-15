import RegisterForm from "@/components/Auth/AuthForm/RegisterForm";
import { useNavigate } from "@tanstack/react-router";
import { FormProps, useForm } from "antd/es/form/Form";
import { FC } from "react";
import { useLazyGetProfileQuery, useRegisterMutation } from "../api";
import { IRegisterFormValues } from "./types";
import { isFormException } from "@/core/guards";
import { setErrorsToField } from "@/core/utils/form";

const RegisterFormContainer: FC = () => {
  const [form] = useForm();
  const navigate = useNavigate({ from: "/auth/register" });

  const [register] = useRegisterMutation();
  const [getProfile] = useLazyGetProfileQuery();

  const onFinish: FormProps<IRegisterFormValues>["onFinish"] = async (
    values,
  ) => {
    try {
      await register(values).unwrap();
      await getProfile().unwrap();
      navigate({ to: "/" });
    } catch (error) {
      if (isFormException(error)) {
        return setErrorsToField(form, error)
      }
      throw error
    }
  };

  return <RegisterForm form={form} onFinish={onFinish} />;
};

export default RegisterFormContainer;
