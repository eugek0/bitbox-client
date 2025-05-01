import { FC } from "react";
import RecoverForm from "..";
import { Button, Flex, Form, Input, Typography } from "antd";
import { IRecoverEmailFields } from "@/containers/Auth/RecoverEmailFormContainer/types";
import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import { RECOVER_FORM_RULES } from "../constants";
import { RecoverFormInstanceProps } from "../types";
import styles from "../styles.module.scss";
import { Link } from "@tanstack/react-router";

const RecoverEmailForm: FC<RecoverFormInstanceProps> = ({
  loading,
  ...props
}) => {
  return (
    <RecoverForm {...props}>
      <Flex gap={25} vertical>
        <Flex align="center" gap={10}>
          <Typography.Text className={styles["form-title"]}>
            Восстановление пароля
          </Typography.Text>
          <Link to="/auth/login">
            <Button icon={<ArrowLeftOutlined />} type="text">
              К авторизации
            </Button>
          </Link>
        </Flex>
        <div>
          <Form.Item<IRecoverEmailFields>
            rules={RECOVER_FORM_RULES.email}
            name="email"
          >
            <Input
              placeholder="Почта"
              suffix={<MailOutlined />}
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
            Отправить письмо
          </Button>
        </Form.Item>
      </div>
    </RecoverForm>
  );
};

export default RecoverEmailForm;
