import { FC } from "react";
import { Button, Flex, Form, Input, InputNumber, Select } from "antd";
import { TCreateStorageModalFields } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
import AppModal from "@/components/Common/AppModal";
import UsersSelect from "@/containers/Common/UsersSelect";
import {
  CREATE_STORAGE_MODAL_INITIAL_VALUES,
  CREATE_STORAGE_MODAL_RULES,
} from "./constants";
import { CreateStorageModalProps } from "./types";
import styles from "./styles.module.scss";

const CreateStorageModal: FC<CreateStorageModalProps> = ({
  form,
  loading,
  onCancel,
  onOk,
  hide,
  ...props
}) => {
  return (
    <AppModal
      {...props}
      onCancel={onCancel}
      width={700}
      title="Создать хранилище"
      footer={() => (
        <>
          <Button onClick={onCancel}>Отмена</Button>
          <Button onClick={onOk} type="primary" loading={loading}>
            ОК
          </Button>
        </>
      )}
    >
      <Form initialValues={CREATE_STORAGE_MODAL_INITIAL_VALUES} form={form}>
        <Flex align="center" gap={15}>
          <Form.Item<TCreateStorageModalFields>
            className={styles["name"]}
            rules={CREATE_STORAGE_MODAL_RULES.default}
            label="Название"
            name="name"
          >
            <Input maxLength={32} />
          </Form.Item>
          <Form.Item<TCreateStorageModalFields>
            rules={CREATE_STORAGE_MODAL_RULES.size}
            label="Размер"
            name="size"
          >
            <InputNumber className={styles["size"]} addonAfter="Бит" />
          </Form.Item>
        </Flex>
        <Form.Item<TCreateStorageModalFields>
          label="Описание"
          name="description"
        >
          <Input.TextArea maxLength={256} />
        </Form.Item>
        <Flex align="center" gap={15}>
          <Form.Item<TCreateStorageModalFields>
            className={styles["access"]}
            rules={CREATE_STORAGE_MODAL_RULES.default}
            label="Доступ"
            name="access"
          >
            <Select
              options={[
                { value: "public", label: "Публичное" },
                { value: "private", label: "Приватное" },
              ]}
            />
          </Form.Item>
          {!hide?.members && (
            <Form.Item<TCreateStorageModalFields>
              className={styles["members"]}
              label="Участники"
              name="members"
            >
              <UsersSelect mode="multiple" allowClear />
            </Form.Item>
          )}
        </Flex>
      </Form>
    </AppModal>
  );
};

export default CreateStorageModal;
