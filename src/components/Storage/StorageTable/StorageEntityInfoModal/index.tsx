import { FC } from "react";
import { StorageEntityInfoModalProps } from "./types";
import { Descriptions, Flex } from "antd";
import AppModal from "@/components/Common/AppModal";
import { FileFilled, FolderFilled } from "@ant-design/icons";
import { convertBytes } from "@/core/utils";
import moment from "moment";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";

const StorageEntityInfoModal: FC<StorageEntityInfoModalProps> = ({
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
      title={`Информация о ${selected?.type === "file" ? "файле" : "директории"}`}
    >
      <Flex gap={15} vertical>
        <Descriptions
          layout="vertical"
          items={[
            {
              key: "1",
              label: "Название",
              children: selected?.fullname,
            },
            {
              key: "2",
              label: "Расширение",
              children: selected?.extension ? `.${selected?.extension}` : "-",
            },
            {
              key: "3",
              label: "Тип",
              children: (
                <Flex gap={10} align="center">
                  {selected?.type === "file" ? (
                    <FileFilled />
                  ) : (
                    <FolderFilled />
                  )}
                  {selected?.type === "file" ? "Файл" : "Директория"}
                </Flex>
              ),
            },
            {
              key: "4",
              label: "Размер",
              children: convertBytes(selected?.size ?? 0),
            },
            {
              key: "5",
              label: "Загрузил",
              children: <ProfileBadgeContainer _id={selected?.uploader} />,
            },
            {
              key: "6",
              label: "Время загрузки",
              children: selected?.uploadedAt
                ? moment(selected?.uploadedAt).format("DD.MM.YYYY HH:mm:ss")
                : "-",
            },
          ]}
        />
      </Flex>
    </AppModal>
  );
};

export default StorageEntityInfoModal;
