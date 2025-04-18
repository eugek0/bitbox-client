import { FC, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import CreateDirectoryModal from "@/components/Storage/StorageTable/CreateDirectoryModal";
import { CreateDirectoryModalContainerProps } from "./types";

const CreateDirectoryModalContainer: FC<CreateDirectoryModalContainerProps> = ({
  handleCloseModal,
  handleOkModal,
  open,
}) => {
  const [form] = useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    handleOkModal(values);
    form.resetFields();
    handleCloseModal();
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open]);

  return (
    <CreateDirectoryModal
      form={form}
      open={open}
      onCancel={handleCloseModal}
      onOk={handleSubmit}
    />
  );
};

export default CreateDirectoryModalContainer;
