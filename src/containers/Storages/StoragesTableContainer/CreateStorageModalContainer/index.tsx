import { FC, useContext, useEffect } from "react";
import CreateStorageModal from "@/components/Storages/StoragesTable/CreateStorageModal";
import { useForm } from "antd/es/form/Form";
import StorageTableContext from "../context";
import { setErrorsToField } from "@/core/utils";
import { isFormException } from "@/core/typeguards";

const CreateStorageModalContainer: FC = () => {
  const context = useContext(StorageTableContext);

  const [form] = useForm();

  if (!context) {
    throw new Error("Context not found");
  }

  const { isModalOpen, isModalLoading, handleOkModal, handleCloseModal } =
    context;

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await handleOkModal(values);
      form.resetFields();
      handleCloseModal();
    } catch (error) {
      if (isFormException(error)) {
        setErrorsToField(form, error);
      }
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen]);

  return (
    <CreateStorageModal
      open={isModalOpen}
      loading={isModalLoading}
      form={form}
      onOk={handleSubmit}
      onCancel={handleCloseModal}
    />
  );
};

export default CreateStorageModalContainer;
