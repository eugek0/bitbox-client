import { FC, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Form,
  Input,
  Select,
  Typography,
} from "antd";
import { ProfileEditFormFields, ProfileEditFormProps } from "./types";
import styles from "./styles.module.scss";
import {
  PROFILE_EDIT_FORM_CONTACT_OPTIONS,
  PROFILE_EDIT_FORM_RULES,
} from "./constants";
import { EditOutlined } from "@ant-design/icons";

const ProfileEditForm: FC<ProfileEditFormProps> = ({
  form,
  avatar,
  isTelegramHidden,
  initialValues,
  isEditing,
  onFinish,
  handleResetAvatar,
  handleChangeAvatar,
}) => {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] =
    useState<boolean>(false);

  const handleToggleAvatarDropdown = (open: boolean) => {
    setIsAvatarDropdownOpen(open);
  };

  return (
    <Form
      className={styles["body"]}
      initialValues={initialValues ?? undefined}
      onFinish={onFinish}
      layout="vertical"
      form={form}
    >
      <Flex gap={40} justify="space-between">
        <Flex flex={1} gap={15} vertical>
          <Flex vertical>
            <Form.Item<ProfileEditFormFields>
              rules={PROFILE_EDIT_FORM_RULES.default}
              name="login"
              label="Логин"
            >
              <Input />
            </Form.Item>
            <Form.Item<ProfileEditFormFields> name="email" label="Email">
              <Input className={styles["disabled"]} disabled />
            </Form.Item>
            <Form.Item<ProfileEditFormFields> name="name" label="Имя">
              <Input />
            </Form.Item>
            <Form.Item<ProfileEditFormFields> name="lastname" label="Фамилия">
              <Input />
            </Form.Item>
            <Form.Item<ProfileEditFormFields>
              name="prefered_contacts"
              label="Предпочитамый способ связи"
              help="Как другие пользователи могут с вами связаться"
            >
              <Select options={PROFILE_EDIT_FORM_CONTACT_OPTIONS} />
            </Form.Item>
            {!isTelegramHidden && (
              <Form.Item<ProfileEditFormFields>
                rules={PROFILE_EDIT_FORM_RULES.telegram}
                name="telegram"
                label="Телеграм"
                help="Ваше имя пользователя в телеграме"
              >
                <Input addonBefore="@" />
              </Form.Item>
            )}
          </Flex>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={isEditing}
              icon={<EditOutlined />}
            >
              Редактировать
            </Button>
          </Form.Item>
        </Flex>
        <Flex gap={10} vertical>
          <Typography.Text className={styles["avatar-title"]}>
            Аватар профиля
          </Typography.Text>
          <div className={styles["avatar-container"]}>
            <Avatar
              onClick={() => handleToggleAvatarDropdown(true)}
              src={avatar}
              className={styles["avatar"]}
            />
            <Dropdown
              onOpenChange={handleToggleAvatarDropdown}
              open={isAvatarDropdownOpen}
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "change",
                    label: "Сменить аватар",
                    onClick: handleChangeAvatar,
                  },
                  {
                    key: "reset",
                    label: "Сбросить аватар",
                    onClick: handleResetAvatar,
                  },
                ],
              }}
              arrow
            >
              <Button
                className={styles["avatar-edit-button"]}
                icon={<EditOutlined />}
                size="small"
              >
                Ред.
              </Button>
            </Dropdown>
          </div>
        </Flex>
      </Flex>
    </Form>
  );
};

export default ProfileEditForm;
