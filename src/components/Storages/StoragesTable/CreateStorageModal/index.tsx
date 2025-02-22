import { FC } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { CreateStorageModalProps } from "./types";
import { TCreateStorageModalFields } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
import { CREATE_STORAGE_MODAL_RULES } from "./constants";

const CreateStorageModal: FC<CreateStorageModalProps> = ({
  form,
  loading,
  onCancel,
  onOk,
  ...props
}) => {
  return (
    <Modal
      {...props}
      onCancel={onCancel}
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
        <Form.Item<TCreateStorageModalFields>
          rules={CREATE_STORAGE_MODAL_RULES.default}
          label="Название"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item<TCreateStorageModalFields>
          label="Описание"
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item<TCreateStorageModalFields>
          rules={CREATE_STORAGE_MODAL_RULES.size}
          label="Размер"
          name="size"
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStorageModal;
