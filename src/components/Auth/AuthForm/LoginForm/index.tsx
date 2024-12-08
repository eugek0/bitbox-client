import { ILoginFormValues } from "@/containers/Auth/LoginFormContainer/types";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import AuthForm from "..";
import { AuthFormInstanceProps } from "../types";
import { AUTH_FORM_RULES } from "../constants";
import styles from "../styles.module.scss";
import { Link } from "@tanstack/react-router";

const LoginForm: FC<AuthFormInstanceProps> = ({ redirectButton, ...props }) => {
  return (
    <AuthForm {...props}>
      <Flex gap={25} vertical>
        <Typography.Text className={styles["form-title"]}>
          Авторизация
        </Typography.Text>
        <Flex gap={10} vertical>
          <Form.Item<ILoginFormValues>
            rules={AUTH_FORM_RULES.email}
            name="email"
          >
            <Input placeholder="Почта" suffix={<MailOutlined />} size="large" />
          </Form.Item>
          <Form.Item<ILoginFormValues>
            rules={AUTH_FORM_RULES.default}
            name="password"
          >
            <Input.Password
              placeholder="Пароль"
              suffix={<KeyOutlined />}
              size="large"
            />
          </Form.Item>
          <div>
            <Form.Item className={styles["submit-button-container"]}>
              <Button
                className={styles["submit-button"]}
                type="primary"
                htmlType="submit"
                size="large"
              >
                Войти
              </Button>
            </Form.Item>
            {redirectButton?.show && (
              <Link to={redirectButton?.link}>
                <Button
                  className={styles["redirect-button"]}
                  type="link"
                  size="large"
                >
                  {redirectButton?.text}
                </Button>
              </Link>
            )}
          </div>
        </Flex>
      </Flex>
    </AuthForm>
  );
};

export default LoginForm;
