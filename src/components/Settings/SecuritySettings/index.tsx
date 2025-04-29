import { FC } from "react";
import styles from "../styles.module.scss";
import { Flex, Typography } from "antd";
import ChangePasswordForm from "./ChangePasswordForm";
import { SecuritySettingsProps } from "./types";

const SecuritySettings: FC<SecuritySettingsProps> = ({
  form,
  handleChangePassword,
  isChanging,
}) => {
  return (
    <Flex flex={1} gap={15} vertical>
      <Typography.Title className={styles["title"]} level={3}>
        Смена пароля
      </Typography.Title>
      <ChangePasswordForm
        onFinish={handleChangePassword}
        form={form}
        isChanging={isChanging}
      />
    </Flex>
  );
};

export default SecuritySettings;
