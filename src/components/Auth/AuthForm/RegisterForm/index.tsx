import { IRegisterFormValues } from "@/containers/Auth/RegisterFormContainer/types";
import { KeyOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FC } from "react";
import AuthForm from "..";
import { DEFAULT_AUTH_FORM_RULES } from "../constants";
import { AuthFormInstanceProps } from "../types";

const RegisterForm: FC<AuthFormInstanceProps> = ({ ...props }) => {
  return (
    <AuthForm {...props}>
      <Form.Item<IRegisterFormValues>
        rules={DEFAULT_AUTH_FORM_RULES}
        name="login"
      >
        <Input placeholder="Логин" suffix={<UserOutlined />} />
      </Form.Item>
      <Form.Item<IRegisterFormValues>
        rules={DEFAULT_AUTH_FORM_RULES}
        name="email"
      >
        <Input placeholder="Почта" suffix={<MailOutlined />} />
      </Form.Item>
      <Form.Item<IRegisterFormValues>
        rules={[
          ...DEFAULT_AUTH_FORM_RULES,
          { min: 5, message: "Длина должна быть не менее 5 символов" },
        ]}
        name="password"
      >
        <Input.Password placeholder="Пароль" suffix={<KeyOutlined />} />
      </Form.Item>
      <Form.Item<IRegisterFormValues>
        rules={[
          {
            validator: (_, value) => {
              const { password } = props.form?.getFieldsValue();
              if (password !== value) {
                return Promise.reject("Пароли не совпадают");
              }
              return Promise.resolve();
            },
          },
        ]}
        name="repeatPassword"
      >
        <Input.Password
          placeholder="Повторите пароль"
          suffix={<KeyOutlined />}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Зарегистрироваться</Button>
      </Form.Item>
    </AuthForm>
  );
};

export default RegisterForm;
