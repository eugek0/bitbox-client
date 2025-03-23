import { FC } from "react";
import { Button, Checkbox, Flex, Form, Input, InputNumber, Select } from "antd";
import { TCreateStorageModalFields } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/types";
import AppModal from "@/components/Common/AppModal";
import UsersSelect from "@/containers/Common/UsersSelect";
import { CREATE_STORAGE_MODAL_RULES } from "./constants";
import { CreateStorageModalProps } from "./types";
import styles from "./styles.module.scss";
import { REQUIRED_FIELD_MESSAGE } from "@/core/constants";
import FileSizeInput from "@/containers/Common/FileSizeInput";

const CreateStorageModal: FC<CreateStorageModalProps> = ({
  initialValues,
  form,
  loading,
  disabled,
  required,
  onCancel,
  config,
  onOk,
  ...props
}) => {
  return (
    <AppModal
      {...props}
      open={config.open}
      onCancel={onCancel}
      width={775}
      title={`${config.mode === "add" ? "Создать" : "Редактировать"} хранилище`}
      footer={() => (
        <>
          <Button onClick={onCancel}>Отмена</Button>
          <Button onClick={onOk} type="primary" loading={loading}>
            ОК
          </Button>
        </>
      )}
    >
      <Form initialValues={initialValues} form={form}>
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
            <FileSizeInput className={styles["number"]} />
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
          <Form.Item<TCreateStorageModalFields>
            className={styles["members"]}
            label="Участники"
            name="members"
          >
            <UsersSelect
              disabled={disabled?.members}
              maxTagCount="responsive"
              mode="multiple"
              allowClear
            />
          </Form.Item>
        </Flex>
        <Flex align="center" justify="space-between">
          <Form.Item<TCreateStorageModalFields>
            label="Ограничить максимальный размер файла"
            name="restrict_file_size"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item<TCreateStorageModalFields>
            label="Максимальный размер файла"
            rules={[
              {
                required: required?.max_file_size,
                message: REQUIRED_FIELD_MESSAGE,
              },
            ]}
            name="max_file_size"
          >
            <FileSizeInput
              className={styles["number"]}
              disabled={disabled?.max_file_size}
              min={1}
            />
          </Form.Item>
        </Flex>
        <Flex align="center" justify="space-between">
          <Form.Item<TCreateStorageModalFields>
            label="Ограничить кол-во файлов"
            name="restrict_files_count"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item<TCreateStorageModalFields>
            label="Максимальное кол-во файлов"
            rules={[
              {
                required: required?.max_files_count,
                message: REQUIRED_FIELD_MESSAGE,
              },
            ]}
            name="max_files_count"
          >
            <InputNumber
              className={styles["number"]}
              disabled={disabled?.max_files_count}
              addonAfter="Шт."
              min={1}
            />
          </Form.Item>
        </Flex>
      </Form>
    </AppModal>
  );
};

export default CreateStorageModal;
