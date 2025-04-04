import { FC } from "react";
import { Flex, Typography } from "antd";
import { CREATE_STORAGE_MODAL_ROLE_LABELS } from "../../constants";
import styles from "./styles.module.scss";

const CreateStorageModalRoleTooltip: FC = () => {
  return (
    <Flex gap={10} vertical>
      <Typography.Text>Что смогут делать все пользователи:</Typography.Text>
      <Typography.Text>
        <span className={styles["role"]}>
          {CREATE_STORAGE_MODAL_ROLE_LABELS.watcher}
        </span>{" "}
        - пользователи могут только просматривать и скачивать файлы
      </Typography.Text>
      <Typography.Text>
        <span className={styles["role"]}>
          {CREATE_STORAGE_MODAL_ROLE_LABELS.maintainer}
        </span>{" "}
        - пользователи могут загружать и редактировать файлы
      </Typography.Text>
      <Typography.Text>
        <span className={styles["role"]}>
          {CREATE_STORAGE_MODAL_ROLE_LABELS.administrator}
        </span>{" "}
        - пользователи могут редактировать хранилище, а также могут полностью
        его удалить
      </Typography.Text>
    </Flex>
  );
};

export default CreateStorageModalRoleTooltip;
