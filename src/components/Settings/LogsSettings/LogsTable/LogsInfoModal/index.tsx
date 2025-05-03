import { FC } from "react";
import AppModal from "@/components/Common/AppModal";
import { LogsInfoModalProps } from "./types";
import { Descriptions, Flex } from "antd";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";
import moment from "moment";
import ReactJson from "react-json-view";
import styles from "./styles.module.scss";

const LogsInfoModal: FC<LogsInfoModalProps> = ({
  config,
  methods,
  selected,
  ...props
}) => {
  const description = methods.find((item) => {
    const [method, url] = item.name.split(" ");

    return (
      selected?.method === method && (selected?.url as string).startsWith(url)
    );
  })?.description;

  return (
    <AppModal
      {...props}
      className={styles["body"]}
      width={1000}
      open={config.open}
      footer={(_, { OkBtn }) => <OkBtn />}
      title="Информация о записи"
    >
      <Flex gap={15} vertical>
        <Descriptions
          layout="vertical"
          items={[
            {
              key: "user",
              label: "Пользователь",
              children: <ProfileBadgeContainer _id={selected?.user} />,
            },
            {
              key: "createdAt",
              label: "Дата и время",
              children: selected?.createdAt
                ? moment(selected?.createdAt).format("DD.MM.YYYY HH:mm:ss")
                : "-",
            },
            {
              key: "method",
              label: "Метод",
              children: selected?.method,
            },
            {
              key: "url",
              label: "URL",
              children: selected?.url,
            },
            {
              key: "description",
              label: "Описание",
              children: description,
              span: 2,
            },
          ]}
        />
        <ReactJson
          name="Тело запроса"
          src={selected?.body}
          theme="hopscotch"
          enableClipboard={false}
          displayObjectSize={false}
        />
        <ReactJson
          name="Query параметры"
          src={selected?.query}
          theme="hopscotch"
          enableClipboard={false}
          displayObjectSize={false}
        />
      </Flex>
    </AppModal>
  );
};

export default LogsInfoModal;
