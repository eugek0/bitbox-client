import { FC } from "react";
import CreateDirectoryModal from "@/components/Storage/CreateDirectoryModal";
import { CreateDirectoryModalContainerProps } from "./types";
import { useForm } from "antd/es/form/Form";

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
  };

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
