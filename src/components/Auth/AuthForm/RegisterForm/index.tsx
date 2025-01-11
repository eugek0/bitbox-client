import { IRegisterFormValues } from "@/containers/Auth/RegisterFormContainer/types";
import { KeyOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import AuthForm from "..";
import { AuthFormInstanceProps } from "../types";
import { AUTH_FORM_RULES } from "../constants";
import styles from "../styles.module.scss";
import { Link } from "@tanstack/react-router";

const RegisterForm: FC<AuthFormInstanceProps> = ({
  redirectButton,
  ...props
}) => {
  return (
    <AuthForm {...props}>
      <Flex gap={25} vertical>
        <Flex align="center" gap={10}>
          <Typography.Text className={styles["form-title"]}>
            Регистрация
          </Typography.Text>
          {redirectButton?.show && (
            <>
              <span className={styles["separator"]}>{">"}</span>
              <Link to={redirectButton?.link}>{redirectButton?.text}</Link>
            </>
          )}
        </Flex>
        <div>
          <Form.Item<IRegisterFormValues>
            rules={AUTH_FORM_RULES.default}
            name="login"
          >
            <Input
              placeholder="Логин"
              suffix={<UserOutlined />}
              size="middle"
            />
          </Form.Item>
          <Form.Item<IRegisterFormValues>
            rules={AUTH_FORM_RULES.email}
            name="email"
          >
            <Input
              placeholder="Почта"
              suffix={<MailOutlined />}
              size="middle"
            />
          </Form.Item>
          <Form.Item<IRegisterFormValues>
            rules={AUTH_FORM_RULES.password}
            name="password"
          >
            <Input.Password
              placeholder="Пароль"
              suffix={<KeyOutlined />}
              size="middle"
            />
          </Form.Item>
          <Form.Item<IRegisterFormValues>
            rules={AUTH_FORM_RULES.repeatPassword(props.form)}
            name="repeatPassword"
          >
            <Input.Password
              placeholder="Повторите пароль"
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
            Зарегистрироваться
          </Button>
        </Form.Item>
      </div>
    </AuthForm>
  );
};

export default RegisterForm;
