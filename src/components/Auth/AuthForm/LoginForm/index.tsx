import { ILoginFormValues } from "@/containers/Auth/LoginFormContainer/types";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FC } from "react";
import AuthForm from "..";
import { DEFAULT_AUTH_FORM_RULES } from "../constants";
import { AuthFormInstanceProps } from "../types";

const LoginForm: FC<AuthFormInstanceProps> = ({ ...props }) => {
  return (
    <AuthForm {...props}>
      <Form.Item<ILoginFormValues> rules={DEFAULT_AUTH_FORM_RULES} name="email">
        <Input placeholder="Почта" suffix={<MailOutlined />} />
      </Form.Item>
      <Form.Item<ILoginFormValues>
        rules={DEFAULT_AUTH_FORM_RULES}
        name="password"
      >
        <Input.Password placeholder="Пароль" suffix={<KeyOutlined />} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Войти</Button>
      </Form.Item>
    </AuthForm>
  );
};

export default LoginForm;
