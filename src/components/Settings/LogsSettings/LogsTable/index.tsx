import { FC } from "react";
import { Flex, Typography } from "antd";
import styles from "./styles.module.scss";
import BitBoxTableContainer from "@/containers/Common/BitBoxTableContainer";
import { LOGS_TABLE_COLUMNS } from "./columns";
import { LogsTableProps } from "./types";
import { BitBoxTableContextMenuDropdownProps } from "@/containers/Common/BitBoxTableContainer/types";
import { MenuProps } from "antd/lib";
import { InfoCircleOutlined } from "@ant-design/icons";
import LogsInfoModalContainer from "@/containers/Settings/LogsSettingsContainer/LogsTableContainer/LogsInfoModalContainer";

const LogsTable: FC<LogsTableProps> = ({ logs, loading }) => {
  const menu = ({
    selected,
    setContextMenuOpen,
    setInfoModalConfig,
  }: BitBoxTableContextMenuDropdownProps): MenuProps => {
    return {
      items: [
        {
          key: "1",
          type: "group",
          label: "Действия",
          children: [
            {
              key: "2",
              label: "Информация",
              icon: <InfoCircleOutlined />,
              disabled: selected.length > 1,
              onClick: () => {
                setInfoModalConfig({ open: true });
                setContextMenuOpen(false);
              },
            },
          ],
        },
      ],
    };
  };

  return (
    <Flex flex={1} gap={15} vertical>
      <Typography.Text>
        Записи возврастом более{" "}
        <span className={styles["highlight"]}>30 дней</span> будут автоматически
        удаляться. Более подробную информацию о записи можно посмотреть, нажав
        на нее правой кнопкой мыши и выбрав пункт "Информация".
      </Typography.Text>
      <BitBoxTableContainer
        records={logs}
        columns={LOGS_TABLE_COLUMNS}
        loading={loading}
        pagination={{}}
        contextMenu={{ show: true, menu }}
        infoModal={LogsInfoModalContainer}
        hideHeader
      />
    </Flex>
  );
};

export default LogsTable;
