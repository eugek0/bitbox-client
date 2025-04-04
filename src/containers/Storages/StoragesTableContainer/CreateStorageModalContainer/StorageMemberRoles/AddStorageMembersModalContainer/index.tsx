import { FC } from "react";
import { useForm } from "antd/es/form/Form";
import AddStorageMembersModal from "@/components/Storages/StoragesTable/CreateStorageModal/StorageMemberRoles/AddStorageMembersModal";
import { AddStorageMembersModalContainerProps } from "./types";
import { ADD_STORAGE_MEMBERS_INITIAL_VALUES } from "./constants";
import { DefaultOptionType } from "antd/es/select";

const AddStorageMembersModalContainer: FC<
  AddStorageMembersModalContainerProps
> = ({ members, handleOkModal, ...props }) => {
  const [form] = useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    handleOkModal(values);
    form.resetFields();
  };

  const filterFn = (option: DefaultOptionType) =>
    !members.some((member) => member._id === option.value);

  return (
    <AddStorageMembersModal
      {...props}
      onOk={handleSubmit}
      initialValues={ADD_STORAGE_MEMBERS_INITIAL_VALUES}
      filterFn={filterFn}
      form={form}
    />
  );
};

export default AddStorageMembersModalContainer;
