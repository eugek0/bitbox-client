import { FC, useContext, useEffect, useState } from "react";
import CreateStorageModal from "@/components/Storages/StoragesTable/CreateStorageModal";
import { useForm, useWatch } from "antd/es/form/Form";
import StorageTableContext from "../context";
import { setErrorsToField } from "@/core/utils";
import { isFormException } from "@/core/typeguards";
import { TCreateStorageModalFields } from "./types";

const CreateStorageModalContainer: FC = () => {
  const [disabled, setDisabled] = useState<
    Partial<Record<keyof TCreateStorageModalFields, boolean>>
  >({
    members: true,
    max_files_count: true,
    max_file_size: true,
  });
  const [required, setRequired] = useState<
    Partial<Record<keyof TCreateStorageModalFields, boolean>>
  >({
    max_files_count: false,
    max_file_size: false,
  });

  const context = useContext(StorageTableContext);

  const [form] = useForm<TCreateStorageModalFields>();

  if (!context) {
    throw new Error("Context not found");
  }

  const access = useWatch("access", form);
  const restrict_file_size = useWatch("restrict_file_size", form);
  const restrict_files_count = useWatch("restrict_files_count", form);

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
      setDisabled({ ...disabled, members: true });
      form.resetFields(["members"]);
    } else {
      setDisabled({ ...disabled, members: false });
    }
  }, [access]);

  useEffect(() => {
    if (restrict_file_size) {
      setDisabled({ ...disabled, max_file_size: false });
      setRequired({ ...required, max_file_size: true });
    } else {
      setDisabled({ ...disabled, max_file_size: true });
      setRequired({ ...required, max_file_size: false });
      form.resetFields(["max_file_size"]);
    }
  }, [restrict_file_size]);

  useEffect(() => {
    if (restrict_files_count) {
      setDisabled({ ...disabled, max_files_count: false });
      setRequired({ ...required, max_files_count: true });
    } else {
      setDisabled({ ...disabled, max_files_count: true });
      setRequired({ ...required, max_files_count: false });
      form.resetFields(["max_files_count"]);
    }
  }, [restrict_files_count]);

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
      disabled={disabled}
      required={required}
    />
  );
};

export default CreateStorageModalContainer;
