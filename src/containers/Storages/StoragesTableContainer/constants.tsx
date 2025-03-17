import { Flex, TableColumnType, Typography } from "antd";
import { ProductFilled } from "@ant-design/icons";
import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";
import { convertBits } from "@/core/utils";
import styles from "./styles.module.scss";

export const STORAGES_TABLE_COLUMNS: TableColumnType<IStoragesTableRecord>[] = [
  {
    title: "Название",
    dataIndex: "name",
    width: "25%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    render: (record) => {
      return (
        <Flex className={styles["storage-name"]} align="center" gap={10}>
          <ProductFilled className={styles["storage-name__icon"]} />
          <Typography.Text className={styles["storage-name__text"]}>
            {record}
          </Typography.Text>
        </Flex>
      );
    },
  },
  {
    title: "Описание",
    dataIndex: "description",
    width: "50%",
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: "Владелец",
    dataIndex: "owner",
    width: "12.5%",
    sorter: true,
    showSorterTooltip: false,
    render: (record) => <ProfileBadgeContainer _id={record} />,
  },
  {
    title: "Занято",
    dataIndex: "used",
    width: "6.25%",
    sorter: true,
    showSorterTooltip: false,
    render: (record) => convertBits(record),
  },
  {
    title: "Размер",
    dataIndex: "size",
    width: "6.25%",
    sorter: true,
    showSorterTooltip: false,
    render: (record) => convertBits(record),
  },
];
