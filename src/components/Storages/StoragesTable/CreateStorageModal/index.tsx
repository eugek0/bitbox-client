import { FC } from "react";
import { Button, Flex, Form, Input, InputNumber } from "antd";
import { TCreateStorageModalFields } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
import { CREATE_STORAGE_MODAL_RULES } from "./constants";
import { CreateStorageModalProps } from "./types";
import styles from "./styles.module.scss";
import AppModal from "@/components/Common/AppModal";

const CreateStorageModal: FC<CreateStorageModalProps> = ({
  form,
  loading,
  onCancel,
  onOk,
  ...props
}) => {
  return (
    <AppModal
      {...props}
      onCancel={onCancel}
      width={700}
      title="Создать хранилище"
      footer={() => (
        <>
          <Button onClick={onCancel}>Отмена</Button>
          <Button onClick={onOk} type="primary" loading={loading}>
            ОК
          </Button>
        </>
      )}
    >
      <Form form={form}>
        <Flex align="center" gap={10}>
          <Form.Item<TCreateStorageModalFields>
            className={styles["input"]}
            rules={CREATE_STORAGE_MODAL_RULES.default}
            label="Название"
            name="name"
          >
            <Input maxLength={32} />
          </Form.Item>
          <Form.Item<TCreateStorageModalFields>
            rules={CREATE_STORAGE_MODAL_RULES.size}
            label="Размер"
            name="size"
          >
            <InputNumber className={styles["number"]} addonAfter="Бит" />
          </Form.Item>
        </Flex>
        <Form.Item<TCreateStorageModalFields>
          label="Описание"
          name="description"
        >
          <Input.TextArea maxLength={256} />
        </Form.Item>
      </Form>
    </AppModal>
  );
};

export default CreateStorageModal;
