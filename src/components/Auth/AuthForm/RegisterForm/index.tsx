import { IRegisterFormValues } from "@/containers/Auth/RegisterFormContainer/types";
import { KeyOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import AuthForm from "..";
import { AuthFormInstanceProps } from "../types";
import { AUTH_FORM_RULES } from "../constants";
import styles from "../styles.module.scss";
import { Link } from "@tanstack/react-router";

const RegisterForm: FC<AuthFormInstanceProps> = ({ ...props }) => {
  return (
    <AuthForm {...props}>
      <Flex gap={25} vertical>
        <Typography.Text className={styles["form-title"]}>
          Регистрация
        </Typography.Text>
        <div>
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
            rules={AUTH_FORM_RULES.repeatPassword(props.form)}
            name="repeatPassword"
          >
            <Input.Password
              placeholder="Повторите пароль"
              suffix={<KeyOutlined />}
            />
          </Form.Item>
          <Form.Item className={styles["submit-button-container"]}>
            <Button
              className={styles["submit-button"]}
              type="primary"
              htmlType="submit"
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
          <Link from="/auth/register" to="/auth/login">
            <Button className={styles["redirect-button"]} type="link">
              Уже есть аккаунт?
            </Button>
          </Link>
        </div>
      </Flex>
    </AuthForm>
  );
};

export default RegisterForm;
