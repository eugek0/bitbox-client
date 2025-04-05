import { FC } from "react";
import { Flex, Form, Select } from "antd";
import AppModal from "@/components/Common/AppModal";
import UsersSelect from "@/containers/Common/UsersSelect";
import {
  AddStorageMembersModalProps,
  IAddStorageMembersModalFields,
} from "./types";
import { CREATE_STORAGE_MODAL_OPTIONS } from "../../constants";
import styles from "./styles.module.scss";

const AddStorageMembersModal: FC<AddStorageMembersModalProps> = ({
  form,
  initialValues,
  filterFn,
  ...props
}) => {
  return (
    <AppModal {...props} width={700} title="Добавить участников">
      <Form<IAddStorageMembersModalFields>
        initialValues={initialValues}
        form={form}
      >
        <Flex gap={15}>
          <Form.Item<IAddStorageMembersModalFields>
            className={styles["members"]}
            help="Искать можно по логину и по email"
            name="members"
            label="Участники"
          >
            <UsersSelect filterFn={filterFn} mode="multiple" />
          </Form.Item>
          <Form.Item<IAddStorageMembersModalFields>
            className={styles["role"]}
            name="role"
          >
            <Select options={CREATE_STORAGE_MODAL_OPTIONS.defaultRole} />
          </Form.Item>
        </Flex>
      </Form>
    </AppModal>
  );
};

export default AddStorageMembersModal;
