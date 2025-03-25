import { FC } from "react";
import { StorageForbiddenProps } from "./types";
import Forbidden from "@/components/Statuses/Forbidden";
import styles from "./styles.module.scss";
import { Flex } from "antd";

const StorageForbidden: FC<StorageForbiddenProps> = ({ error }) => {
  return (
    <Flex className="page100vh" align="center" justify="center">
      <Forbidden
        subTitle={
          <span className={styles["message"]}>
            У вас нет доступа к этому хранилищу
            {error?.data?.type && (
              <>
                . Обратитесь к владельцу, для того чтобы он предоставил вам
                доступ:{" "}
                <a
                  target="_blank"
                  href={`${error?.data?.type === "email" ? "mailto:" : "https://t.me/"}${error?.data?.contacts}`}
                >
                  {error?.data?.type === "telegram" && "@"}
                  {error?.data?.contacts}
                </a>
              </>
            )}{" "}
          </span>
        }
      />
    </Flex>
  );
};

export default StorageForbidden;
