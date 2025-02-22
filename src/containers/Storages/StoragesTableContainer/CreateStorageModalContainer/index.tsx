import { FC, useContext, useEffect, useState } from "react";
import CreateStorageModal from "@/components/Storages/StoragesTable/CreateStorageModal";
import { useForm, useWatch } from "antd/es/form/Form";
import StorageTableContext from "../context";
import { setErrorsToField } from "@/core/utils";
import { isFormException } from "@/core/typeguards";
import { TCreateStorageModalFields } from "./types";

const CreateStorageModalContainer: FC = () => {
  const [hide, setHide] = useState<
    Partial<Record<keyof TCreateStorageModalFields, boolean>>
  >({
    members: false,
  });

  const context = useContext(StorageTableContext);

  const [form] = useForm<TCreateStorageModalFields>();

  if (!context) {
    throw new Error("Context not found");
  }

  const access = useWatch("access", form);

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
      throw error;
    }
  };

  useEffect(() => {
    if (access === "public") {
      setHide({ ...hide, members: true });
    } else {
      setHide({ ...hide, members: false });
    }
  }, [access]);

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
      hide={hide}
    />
  );
};

export default CreateStorageModalContainer;
