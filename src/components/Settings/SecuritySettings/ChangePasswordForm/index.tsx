import { FC } from "react";
import { Button, Flex, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ChangePasswordFormFields, ChangePasswordFormProps } from "./types";
import { CHANGE_PASSWORD_FORM_RULES } from "./constants";

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  form,
  isChanging,
  onFinish,
}) => {
  return (
    <Form onFinish={onFinish} form={form} layout="vertical">
      <Flex gap={40} justify="space-between">
        <Flex flex={1} gap={15} vertical>
          <Flex vertical>
            <Form.Item<ChangePasswordFormFields>
              rules={CHANGE_PASSWORD_FORM_RULES.default}
              name="oldPassword"
              label="Старый пароль"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<ChangePasswordFormFields>
              rules={CHANGE_PASSWORD_FORM_RULES.newPassword}
              name="newPassword"
              label="Новый пароль"
            >
              <Input.Password />
            </Form.Item>
          </Flex>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={isChanging}
              icon={<EditOutlined />}
            >
              Сменить пароль
            </Button>
          </Form.Item>
        </Flex>
      </Flex>
    </Form>
  );
};

export default ChangePasswordForm;
