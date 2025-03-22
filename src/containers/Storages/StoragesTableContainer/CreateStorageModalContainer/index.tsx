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
    max_files_count: true,
    max_file_size: true,
  });
  const [required, setRequired] = useState<
    Partial<Record<keyof TCreateStorageModalFields, boolean>>
  >({
    max_files_count: false,
    max_file_size: false,
  });
  const [initialValues, setInitialValues] = useState<BitBoxTableRecord>(
    CREATE_STORAGE_MODAL_INITIAL_VALUES,
  );

  const [form] = useForm<TCreateStorageModalFields>();

  const access = useWatch("access", form);
  const restrict_file_size = useWatch("restrict_file_size", form);
  const restrict_files_count = useWatch("restrict_files_count", form);

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
    if (config?.open) {
      setInitialValues(
        config.mode === "add"
          ? CREATE_STORAGE_MODAL_INITIAL_VALUES
          : selected[0],
      );
    }
  }, [config, selected]);

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <CreateStorageModal
      config={config}
      loading={isModalLoading}
      form={form}
      selected={selected}
      onOk={handleSubmit}
      onCancel={handleCloseModal}
      disabled={disabled}
      required={required}
      initialValues={initialValues}
    />
  );
};

export default CreateStorageModalContainer;
