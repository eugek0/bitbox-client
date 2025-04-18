import { FC, useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import RenameEntityModal from "@/components/Storage/StorageTable/RenameEntityModal";
import {
  IRenameEntityModalFields,
  RenameEntityModalContainerProps,
} from "./types";
import { Nullable } from "@/core/types";

const RenameEntityModalContainer: FC<RenameEntityModalContainerProps> = ({
  open,
  selected,
  handleOkModal,
  handleCloseModal,
  ...props
}) => {
  const [initialValues, setInitialValues] = useState<
    Nullable<IRenameEntityModalFields>
  >(selected as IRenameEntityModalFields);
  const [form] = useForm<IRenameEntityModalFields>();

  const onOk = async () => {
    const values = await form.validateFields();

    await handleOkModal(values);
    handleCloseModal();
    form.resetFields();
  };

  useEffect(() => {
    if (open) {
      setInitialValues(selected as IRenameEntityModalFields);
    }
  }, [open, selected]);

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <RenameEntityModal
      {...props}
      form={form}
      open={open}
      selected={selected}
      onCancel={handleCloseModal}
      onOk={onOk}
    />
  );
};

export default RenameEntityModalContainer;
