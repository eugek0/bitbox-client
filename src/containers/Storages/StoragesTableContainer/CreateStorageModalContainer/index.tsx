import { FC, useEffect, useState } from "react";
import CreateStorageModal from "@/components/Storages/StoragesTable/CreateStorageModal";
import { useForm, useWatch } from "antd/es/form/Form";
import { setErrorsToField } from "@/core/utils";
import { isFormException } from "@/core/typeguards";
import {
  CreateStorageModalContainerProps,
  TCreateStorageModalFields,
} from "./types";
import { CREATE_STORAGE_MODAL_INITIAL_VALUES } from "./constants";
import { BitBoxTableRecord } from "@/containers/Common/BitBoxTableContainer/types";

const CreateStorageModalContainer: FC<CreateStorageModalContainerProps> = ({
  isModalLoading,
  config,
  selected,
  setConfig,
  handleAddRow,
  handleEditRow,
}) => {
  const [disabled, setDisabled] = useState<
    Partial<Record<keyof TCreateStorageModalFields, boolean>>
  >({
    members: true,
    maxFilesCount: true,
    maxFileSize: true,
  });
  const [required, setRequired] = useState<
    Partial<Record<keyof TCreateStorageModalFields, boolean>>
  >({
    maxFilesCount: false,
    maxFileSize: false,
  });
  const [initialValues, setInitialValues] = useState<BitBoxTableRecord>(
    CREATE_STORAGE_MODAL_INITIAL_VALUES,
  );

  const [form] = useForm<TCreateStorageModalFields>();

  const access = useWatch("access", form);
  const restrictFileSize = useWatch("restrictFileSize", form);
  const restrictFilesCount = useWatch("restrictFilesCount", form);

  const handleCloseModal = () => {
    setConfig({ open: false, mode: null });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (config.mode === "add") {
        await handleAddRow?.(values);
      } else {
        await handleEditRow?.(values, selected[0]);
      }
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
    if (restrictFileSize) {
      setDisabled({ ...disabled, maxFileSize: false });
      setRequired({ ...required, maxFileSize: true });
    } else {
      setDisabled({ ...disabled, maxFileSize: true });
      setRequired({ ...required, maxFileSize: false });
      form.resetFields(["maxFileSize"]);
    }
  }, [restrictFileSize]);

  useEffect(() => {
    if (restrictFilesCount) {
      setDisabled({ ...disabled, maxFilesCount: false });
      setRequired({ ...required, maxFilesCount: true });
    } else {
      setDisabled({ ...disabled, maxFilesCount: true });
      setRequired({ ...required, maxFilesCount: false });
      form.resetFields(["maxFilesCount"]);
    }
  }, [restrictFilesCount]);

  useEffect(() => {
    if (config?.open) {
      setInitialValues(
        config.mode === "add"
          ? CREATE_STORAGE_MODAL_INITIAL_VALUES
          : selected[0],
      );
    }
  }, [config, selected]);

  useEffect(() => {
    if (config.open) {
      form.resetFields();
    }
  }, [config.open]);

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <CreateStorageModal
      config={config}
      loading={isModalLoading}
      form={form}
      onOk={handleSubmit}
      onCancel={handleCloseModal}
      disabled={disabled}
      required={required}
      initialValues={initialValues}
    />
  );
};

export default CreateStorageModalContainer;
