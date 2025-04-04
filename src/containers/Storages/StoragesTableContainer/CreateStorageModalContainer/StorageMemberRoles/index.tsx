import { FC, MouseEventHandler, useEffect, useState } from "react";
import { StorageMemberRolesProps } from "./types";
import {
  IStorageMember,
  TStorageMemberRole,
} from "@/containers/Storages/types";
import { Avatar, Button, Flex, List, Select, Typography } from "antd";
import { useGetUsersRecordQuery } from "@/core/api";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import AddStorageMembersModalContainer from "./AddStorageMembersModalContainer";
import { IAddStorageMembersModalFields } from "@/components/Storages/StoragesTable/CreateStorageModal/StorageMemberRoles/AddStorageMembersModal/types";
import styles from "./styles.module.scss";
import { CREATE_STORAGE_MODAL_OPTIONS } from "@/components/Storages/StoragesTable/CreateStorageModal/constants";
import { useAppSelector } from "@/store";
import { profileIdSelector } from "@/containers/Auth/selectors";

const StorageMemberRoles: FC<StorageMemberRolesProps> = ({
  value: foreignValue,
  onChange: foreignOnChange,
}) => {
  const [value, setValue] = useState<IStorageMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const profileId = useAppSelector(profileIdSelector);

  const { data: members, isFetching } = useGetUsersRecordQuery();

  const handleTriggerChange = (value: IStorageMember[]) => {
    foreignOnChange?.(value);
    setValue(value);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickAddMember: MouseEventHandler<HTMLButtonElement> = () => {
    setIsModalOpen(true);
  };

  const handleEditMemberRole = (_id: string, role: TStorageMemberRole) => {
    handleTriggerChange(
      value.map((member) =>
        member._id === _id ? { ...member, role } : member,
      ),
    );
  };

  const handleRemoveMember = (_id: string) => {
    handleTriggerChange(value.filter((member) => member._id !== _id));
  };

  const handleAddMember = (fields: IAddStorageMembersModalFields) => {
    handleTriggerChange([
      ...(value ?? []),
      ...fields.members.map((member) => ({
        _id: member,
        role: fields.role,
      })),
    ]);
    handleCloseModal();
  };

  useEffect(() => {
    setValue(foreignValue ?? []);
  }, [foreignValue]);

  return (
    <>
      <Flex gap={15} vertical>
        <List
          header={
            <Flex gap={15} align="center">
              <Typography.Text>Участники</Typography.Text>
              <Button
                onClick={handleClickAddMember}
                icon={<PlusOutlined />}
                type="text"
              >
                Добавить
              </Button>
            </Flex>
          }
          loading={isFetching}
          dataSource={value.filter((member) => member._id !== profileId)}
          renderItem={(item) => (
            <List.Item
              extra={
                <Flex
                  className={styles["list-item-extra"]}
                  gap={15}
                  align="center"
                >
                  <Select
                    className={styles["role"]}
                    onChange={(role) => handleEditMemberRole(item._id, role)}
                    options={CREATE_STORAGE_MODAL_OPTIONS.defaultRole}
                    variant="borderless"
                    value={item.role}
                  />
                  <Button
                    onClick={() => handleRemoveMember(item._id)}
                    icon={<CloseOutlined />}
                    type="text"
                    danger
                  />
                </Flex>
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={members?.[item._id]?.avatar ?? ""} />}
                title={members?.[item._id]?.login ?? ""}
              />
            </List.Item>
          )}
        />
      </Flex>
      <AddStorageMembersModalContainer
        open={isModalOpen}
        members={value}
        onCancel={handleCloseModal}
        handleOkModal={handleAddMember}
      />
    </>
  );
};

export default StorageMemberRoles;
