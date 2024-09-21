import { ILoginFormValues } from "@/containers/Auth/LoginFormContainer/types";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import AuthForm from "..";
import { AuthFormInstanceProps } from "../types";
import { AUTH_FORM_RULES } from "../constants";
import styles from "../styles.module.scss";

const LoginForm: FC<AuthFormInstanceProps> = ({ ...props }) => {
  return (
    <AuthForm {...props}>
      <Flex gap={25} vertical>
        <Typography.Text className={styles["form-title"]}>
          Авторизация
        </Typography.Text>
        <div>
          <Form.Item<ILoginFormValues>
            rules={AUTH_FORM_RULES.email}
            name="email"
          >
            <Input placeholder="Почта" suffix={<MailOutlined />} />
          </Form.Item>
          <Form.Item<ILoginFormValues>
            rules={AUTH_FORM_RULES.default}
            name="password"
          >
            <Input.Password placeholder="Пароль" suffix={<KeyOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button
              className={styles["submit-button"]}
              type="primary"
              htmlType="submit"
            >
              Войти
            </Button>
          </Form.Item>
        </div>
      </Flex>
    </AuthForm>
  );
};

export default LoginForm;
