import { IRegisterFormValues } from "@/containers/Auth/RegisterFormContainer/types";
import { KeyOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FC } from "react";
import AuthForm from "..";
import { AuthFormInstanceProps } from "../types";
import { AUTH_FORM_RULES } from "../constants";

const RegisterForm: FC<AuthFormInstanceProps> = ({ ...props }) => {
  return (
    <AuthForm {...props}>
      <Form.Item<IRegisterFormValues>
        rules={AUTH_FORM_RULES.default}
        name="login"
      >
        <Input placeholder="Логин" suffix={<UserOutlined />} />
      </Form.Item>
      <Form.Item<IRegisterFormValues>
        rules={AUTH_FORM_RULES.email}
        name="email"
      >
        <Input placeholder="Почта" suffix={<MailOutlined />} />
      </Form.Item>
      <Form.Item<IRegisterFormValues>
        rules={[
          ...AUTH_FORM_RULES.password,
          { min: 5, message: "Длина должна быть не менее 5 символов" },
        ]}
        name="password"
      >
        <Input.Password placeholder="Пароль" suffix={<KeyOutlined />} />
      </Form.Item>
      <Form.Item<IRegisterFormValues>
        rules={[
          ...AUTH_FORM_RULES.repeatPassword,
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
