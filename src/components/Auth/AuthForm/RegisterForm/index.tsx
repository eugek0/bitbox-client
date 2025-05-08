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
  loading,
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
            rules={AUTH_FORM_RULES.repeatPassword}
            name="repeatPassword"
            dependencies={["password"]}
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
            loading={loading}
            htmlType="submit"
            type="primary"
            size="middle"
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
        <Typography.Text className={styles["agreement"]}>
          Продолжая, вы принимаете{" "}
          <Link className={styles["link"]} to="/agreement/user">
            условия
          </Link>{" "}
          и{" "}
          <Link className={styles["link"]} to="/agreement/confidentiality">
            политику конфиденциальности
          </Link>
          .
        </Typography.Text>
      </div>
    </AuthForm>
  );
};

export default RegisterForm;
