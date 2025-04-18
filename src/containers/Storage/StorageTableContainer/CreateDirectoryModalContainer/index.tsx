import { FC, KeyboardEventHandler, useEffect, useRef } from "react";
import { useForm } from "antd/es/form/Form";
import CreateDirectoryModal from "@/components/Storage/StorageTable/CreateDirectoryModal";
import { CreateDirectoryModalContainerProps } from "./types";
import { InputRef } from "antd";

const CreateDirectoryModalContainer: FC<CreateDirectoryModalContainerProps> = ({
  handleCloseModal,
  handleOkModal,
  open,
}) => {
  const [form] = useForm();

  const nameRef = useRef<InputRef>(null);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    handleOkModal(values);
    form.resetFields();
    handleCloseModal();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
    switch (event.code) {
      case "Enter":
        handleSubmit();
        break;
    }
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
      requestAnimationFrame(() => {
        nameRef.current?.focus();
      });
    }
  }, [open]);

  return (
    <CreateDirectoryModal
      form={form}
      open={open}
      nameRef={nameRef}
      onCancel={handleCloseModal}
      handleKeyDown={handleKeyDown}
      onOk={handleSubmit}
    />
  );
};

export default CreateDirectoryModalContainer;
