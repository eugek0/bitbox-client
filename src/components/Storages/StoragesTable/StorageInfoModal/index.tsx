import AppModal from "@/components/Common/AppModal";
import { FC } from "react";
import { StorageInfoModalProps } from "./types";
import { Descriptions, Flex } from "antd";
import { convertBytes } from "@/core/utils";
import { STORAGE_ACCESS_DICTIONARY } from "@/containers/Storages/constants";
import { TStorageAccess } from "@/containers/Storages/types";
import moment from "moment";
import StorageMemberRoles from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/StorageMemberRoles";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";

const StorageInfoModal: FC<StorageInfoModalProps> = ({
  config,
  selected,
  ...props
}) => {
  return (
    <AppModal
      {...props}
      width={1000}
      open={config.open}
      footer={(_, { OkBtn }) => <OkBtn />}
      title="Информация о хранилище"
    >
      <Flex gap={15} vertical>
        <Descriptions
          layout="vertical"
          items={[
            {
              label: "Название",
              children: selected?.name,
            },
            {
              label: "Описание",
              children: selected?.description || "-",
            },
            {
              label: "Владелец",
              children: <ProfileBadgeContainer _id={selected?.owner} />,
            },
            {
              label: "Создано",
              children: moment(selected?.createdAt).format(
                "DD.MM.YYYY HH:mm:ss",
              ),
            },
            {
              label: "Доступ",
              children:
                STORAGE_ACCESS_DICTIONARY[selected?.access as TStorageAccess],
            },
            {
              label: "Занято",
              children: convertBytes(selected?.used ?? 0),
            },
            {
              label: "Размер",
              children: convertBytes(selected?.size ?? 0),
            },
            {
              label: "Максимальный размер файла",
              children: selected?.restrictFileSize
                ? convertBytes(selected?.maxFileSize ?? 0)
                : "-",
            },
            {
              label: "Максимальное количество файлов",
              children: selected?.restrictFilesCount
                ? selected?.maxFilesCount
                : "-",
            },
          ]}
        />
        <StorageMemberRoles value={selected?.members} readOnly />
      </Flex>
    </AppModal>
  );
};

export default StorageInfoModal;
