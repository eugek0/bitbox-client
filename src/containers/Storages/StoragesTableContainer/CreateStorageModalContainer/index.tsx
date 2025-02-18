import { FC } from "react";
import CreateStorageModal from "@/components/Storages/StoragesTable/CreateStorageModal";
import { useForm } from "antd/es/form/Form";
import { CreateStorageModalContainerProps } from "./types";

const CreateStorageModalContainer: FC<CreateStorageModalContainerProps> = ({
  open,
  handleCloseModal,
  handleOkModal,
}) => {
  const [form] = useForm();

  return (
    <CreateStorageModal
      open={open}
      form={form}
      onOk={handleOkModal}
      onCancel={handleCloseModal}
    />
  );
};

export default CreateStorageModalContainer;
