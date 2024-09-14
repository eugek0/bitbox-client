import { FC } from "react";
import { AuthFormProps } from "./types";
import { Form } from "antd";

const AuthForm: FC<AuthFormProps> = ({ children, form, onFinish }) => {
  return (
    <Form form={form} onFinish={onFinish}>
      {children}
    </Form>
  );
};

export default AuthForm;
