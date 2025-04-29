import { FC } from "react";
import { Flex, Typography } from "antd";
import { ProfileSettingsProps } from "./types";
import styles from "./styles.module.scss";
import ProfileEditForm from "./ProfileEditForm";

const ProfileSettings: FC<ProfileSettingsProps> = ({
  form,
  initialValues,
  isTelegramHidden,
  isEditing,
  avatar,
  handleEdit,
}) => {
  return (
    <Flex flex={1} gap={15} vertical>
      <Typography.Title className={styles["title"]} level={3}>
        Настройки профиля
      </Typography.Title>
      <ProfileEditForm
        form={form}
        isTelegramHidden={isTelegramHidden}
        initialValues={initialValues}
        isEditing={isEditing}
        onFinish={handleEdit}
        avatar={avatar}
      />
    </Flex>
  );
};

export default ProfileSettings;
