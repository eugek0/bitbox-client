import { FC } from "react";
import { ChangePasswordModalProps } from "./types";
import AppModal from "@/components/Common/AppModal";
import { Typography } from "antd";
import styles from "./styles.module.scss";

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  email,
  ...props
}) => {
  return (
    <AppModal
      {...props}
      title="Смена пароля"
      footer={(_, { OkBtn }) => <OkBtn />}
    >
      <Typography.Text>
        На адрес электронной почты{" "}
        <span className={styles["email"]}>{email}</span>, было отправлено письмо
        со ссылкой на смену пароля. Ссылка является одноразовой и будет
        действовать 10 минут.
      </Typography.Text>
    </AppModal>
  );
};

export default ChangePasswordModal;
