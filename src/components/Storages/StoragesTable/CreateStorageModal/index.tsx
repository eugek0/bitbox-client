import { FC } from "react";
import { Form, Input, Modal } from "antd";
import { CreateStorageModalProps } from "./types";

const CreateStorageModal: FC<CreateStorageModalProps> = ({
  form,
  ...props
}) => {
  return (
    <Modal {...props} title="Создать хранилище">
      <Form form={form}>
        <Form.Item
          rules={[{ required: true, message: "Обязательное поле" }]}
          label="Название"
          name="name"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStorageModal;
