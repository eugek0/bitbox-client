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
        <Flex align="center" gap={10}>
          <Typography.Text className={styles["form-title"]}>
            Авторизация
          </Typography.Text>
          {redirectButton?.show && (
            <>
              <span className={styles["separator"]}>{">"}</span>
              <Link to={redirectButton?.link}>{redirectButton?.text}</Link>
            </>
          )}
        </Flex>
        <div>
          <Form.Item<ILoginFormValues>
            rules={AUTH_FORM_RULES.email}
            name="email"
          >
            <Input
              placeholder="Почта"
              suffix={<MailOutlined />}
              size="middle"
            />
          </Form.Item>
          <Form.Item<ILoginFormValues>
            rules={AUTH_FORM_RULES.default}
            name="password"
          >
            <Input.Password
              placeholder="Пароль"
              suffix={<KeyOutlined />}
              size="middle"
            />
          </Form.Item>
        </div>
      </Flex>
      <div>
        <Form.Item className={styles["submit-button-container"]}>
          <Button
            className={styles["submit-button"]}
            type="primary"
            htmlType="submit"
            size="middle"
          >
            Войти
          </Button>
        </Form.Item>
      </div>
    </AuthForm>
  );
};

export default LoginForm;
