import { FC } from "react";
import RecoverForm from "..";
import { Button, Flex, Form, Input, Typography } from "antd";
import { RecoverFormInstanceProps } from "../types";
import { Link } from "@tanstack/react-router";
import { IRecoverPasswordFields } from "@/containers/Auth/RecoverPasswordFormContainer/types";
import { ArrowLeftOutlined, KeyOutlined } from "@ant-design/icons";
import styles from "../styles.module.scss";
import { RECOVER_FORM_RULES } from "../constants";

const RecoverPasswordForm: FC<RecoverFormInstanceProps> = ({
  loading,
  ...props
}) => {
  return (
    <RecoverForm {...props}>
      <Flex gap={25} vertical>
        <Flex align="center" gap={10}>
          <Typography.Text className={styles["form-title"]}>
            Смена пароля
          </Typography.Text>
          <Link to="/auth/login">
            <Button icon={<ArrowLeftOutlined />} type="text">
              К авторизации
            </Button>
          </Link>
        </Flex>
        <div>
          <Form.Item<IRecoverPasswordFields>
            rules={RECOVER_FORM_RULES.password}
            name="password"
          >
            <Input.Password
              placeholder="Новый пароль"
              suffix={<KeyOutlined />}
              size="middle"
            />
          </Form.Item>
          <Form.Item<IRecoverPasswordFields>
            rules={RECOVER_FORM_RULES.repeatPassword}
            name="repeatPassword"
            dependencies={["password"]}
          >
            <Input.Password
              placeholder="Повторите новый пароль"
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
            Сменить пароль
          </Button>
        </Form.Item>
      </div>
    </RecoverForm>
  );
};

export default RecoverPasswordForm;
