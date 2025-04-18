import { FC, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { useForm } from "antd/es/form/Form";
import RenameEntityModal from "@/components/Storage/StorageTable/RenameEntityModal";
import {
  IRenameEntityModalFields,
  RenameEntityModalContainerProps,
} from "./types";
import { Nullable } from "@/core/types";
import { InputRef } from "antd";

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

  const fullnameRef = useRef<InputRef>(null);

  const onOk = async () => {
    const values = await form.validateFields();

    await handleOkModal(values);
    handleCloseModal();
    form.resetFields();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (event) => {
    switch (event.code) {
      case "Enter":
        onOk();
        break;
    }
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
      setInitialValues(selected as IRenameEntityModalFields);
      requestAnimationFrame(() => {
        fullnameRef.current?.focus();
        fullnameRef.current?.setSelectionRange(
          0,
          selected.fullname.lastIndexOf("\."),
        );
      });
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
      fullnameRef={fullnameRef}
      handleKeyDown={handleKeyDown}
      onCancel={handleCloseModal}
      onOk={onOk}
    />
  );
};

export default RenameEntityModalContainer;
