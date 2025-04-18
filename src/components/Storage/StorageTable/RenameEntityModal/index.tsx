import { FC } from "react";
import { Button, Form, Input } from "antd";
import AppModal from "@/components/Common/AppModal";
import { RenameEntityModalProps } from "./types";
import { IRenameEntityModalFields } from "@/containers/Storage/StorageTableContainer/RenameEntityModalContainer/types";
import { RENAME_ENTITY_MODAL_RULES } from "./constants";

const RenameEntityModal: FC<RenameEntityModalProps> = ({
  form,
  selected,
  onOk,
  handleKeyDown,
  fullnameRef,
  ...props
}) => {
  return (
    <AppModal
      {...props}
      width={500}
      title="Переименовать сущность"
      footer={(_, { CancelBtn }) => (
        <>
          <CancelBtn />
          <Button onClick={onOk} type="primary">
            OK
          </Button>
        </>
      )}
    >
      <Form onKeyDown={handleKeyDown} initialValues={selected} form={form}>
        <Form.Item<IRenameEntityModalFields>
          rules={RENAME_ENTITY_MODAL_RULES.default}
          name="fullname"
          label="Название"
        >
          <Input ref={fullnameRef} />
        </Form.Item>
      </Form>
    </AppModal>
  );
};

export default RenameEntityModal;
