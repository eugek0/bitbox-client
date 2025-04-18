import { FC } from "react";
import AppModal from "@/components/Common/AppModal";
import {
  CreateDirectoryModalProps,
  ICreateDirectoryModalFields,
} from "./types";
import { Form, Input } from "antd";
import { CREATE_DIRECTORY_MODAL_RULES } from "./constants";

const CreateDirectoryModal: FC<CreateDirectoryModalProps> = ({
  form,
  nameRef,
  handleKeyDown,
  ...props
}) => {
  return (
    <AppModal title="Создать директорию" {...props}>
      <Form onKeyDown={handleKeyDown} form={form}>
        <Form.Item<ICreateDirectoryModalFields>
          rules={CREATE_DIRECTORY_MODAL_RULES.default}
          name="name"
          label="Название"
        >
          <Input ref={nameRef} />
        </Form.Item>
      </Form>
    </AppModal>
  );
};

export default CreateDirectoryModal;
