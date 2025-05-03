import { FC } from "react";
import { Flex, Typography } from "antd";
import { ProfileSettingsProps } from "./types";
import styles from "../styles.module.scss";
import ProfileEditForm from "./ProfileEditForm";
import ProfileAvatarEditorContainer from "@/containers/Settings/ProfileSettingsContainer/ProfileAvatarEditorContainer";

const ProfileSettings: FC<ProfileSettingsProps> = ({
  form,
  initialValues,
  isTelegramHidden,
  isEditing,
  avatar,
  image,
  handleEdit,
  handleChangeAvatar,
  handleResetAvatar,
  handleClosechangeAvatar,
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
        handleResetAvatar={handleResetAvatar}
        handleChangeAvatar={handleChangeAvatar}
      />
      {image && (
        <ProfileAvatarEditorContainer
          image={image}
          handleClose={handleClosechangeAvatar}
        />
      )}
    </Flex>
  );
};

export default ProfileSettings;
