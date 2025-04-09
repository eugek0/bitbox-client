import { FC } from "react";
import { StorageEntityInfoModalProps } from "./types";
import { Descriptions, Flex } from "antd";
import AppModal from "@/components/Common/AppModal";
import { FileFilled, FolderFilled } from "@ant-design/icons";
import { convertBytes } from "@/core/utils";

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
      title={`Информация о ${selected?.type === "file" ? "файле" : "папке"}`}
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
                <Flex gap={5} align="center">
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
              children: convertBytes(selected?.size),
            },
          ]}
        />
      </Flex>
    </AppModal>
  );
};

export default StorageEntityInfoModal;
