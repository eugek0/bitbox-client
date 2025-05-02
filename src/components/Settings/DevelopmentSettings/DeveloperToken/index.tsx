import {
  CopyOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Flex,
  Input,
  Skeleton,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { FC } from "react";
import styles from "./styles.module.scss";
import { SERVER_BASE_URL } from "@/core/constants";
import { DeveloperTokenProps } from "./types";

const DeveloperToken: FC<DeveloperTokenProps> = ({
  token,
  hasDevToken,
  isGenerateButtonLoading,
  isDeleteButtonLoading,
  isTokenLoading,
  handleCopy,
  handleGenerateToken,
  handleDeleteToken,
}) => {
  return (
    <Flex gap={20} vertical>
      <Flex gap={15} vertical>
        <Typography.Text>
          Сгенерированный токен является бессрочным и{" "}
          <span className={styles["highlight"]}>
            единственным на аккаунт, при генерации нового токена, старый
            перестает работать
          </span>
          . Возможности токена ограничены возможностями вашего аккаунта, он
          предоставляется только для автоматизации процессов работы с сервисом.
        </Typography.Text>
        <Typography.Text>
          <span className={styles["highlight"]}>
            После генерации токена, он будет показан единожды, сохраните его.
          </span>{" "}
          При смене пароля аккаунта, токен будет сброшен, его нужно будет
          сгенерировать заного.{" "}
        </Typography.Text>
      </Flex>
      <Flex align="center" gap={15}>
        <label className={styles["label"]}>Токен: </label>
        {isTokenLoading ? (
          <>
            <Skeleton
              className={styles["skeleton-input"]}
              paragraph={false}
              active
            />
            <Skeleton.Button className={styles["skeleton-button"]} active />
            <Skeleton
              className={styles["skeleton-node"]}
              paragraph={false}
              active
            />
          </>
        ) : (
          <>
            <Space.Compact className={styles["token-input"]}>
              <Input value={token ?? ""} readOnly />
              <Button
                onClick={handleCopy}
                disabled={!token}
                icon={<CopyOutlined />}
              />
            </Space.Compact>
            <Space.Compact>
              <Button
                onClick={handleGenerateToken}
                icon={<ReloadOutlined />}
                loading={isGenerateButtonLoading}
              >
                Сгенерировать
              </Button>
              <Tooltip title="Удалить токен">
                <Button
                  onClick={handleDeleteToken}
                  disabled={!(token || hasDevToken)}
                  loading={isDeleteButtonLoading}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Space.Compact>
            <Badge
              status="processing"
              className={token || hasDevToken ? "" : styles["badge-error"]}
              text={
                token || hasDevToken ? "У вас есть токен" : "У вас нет токена"
              }
            />
          </>
        )}
      </Flex>
      <Typography.Text>
        Для того, чтобы воспользоваться API, нужно внедрить токен в{" "}
        <span className={styles["highlight"]}>Authorization</span> заголовок
        таким образом:{" "}
        <span className={styles["quote"]}>
          Authorization: Bearer {"{token}"}
        </span>
        . Для ознакомления предоставлена{" "}
        <a href={`${SERVER_BASE_URL}/api`} target="_blank">
          Документация
        </a>{" "}
        к API.
      </Typography.Text>
    </Flex>
  );
};

export default DeveloperToken;
