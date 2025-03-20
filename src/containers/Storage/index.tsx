import { FC } from "react";
import { Button, Flex, Result } from "antd";
import { Link, useParams } from "@tanstack/react-router";
import Storage from "@/components/Storage";
import FullscreenLoader from "../Common/FullscreenLoader";
import { isRTKQueryError } from "@/core/typeguards/rtkquery.typeguards";
import { useGetStorageQuery } from "./api";
import styles from "./styles.module.scss";

const StorageContainer: FC = () => {
  const { id } = useParams({ from: "/storage/$id" });

  const { data: storage, error, isLoading } = useGetStorageQuery(id);

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (isRTKQueryError(error) && error.status === 404) {
    return (
      <Flex className={styles["result"]} align="center" justify="center">
        <Result
          status={"404"}
          title="404"
          subTitle="Такого хранилища не существует"
          extra={
            <Link to="/">
              <Button type="link">К списку хранилищ</Button>
            </Link>
          }
        />
      </Flex>
    );
  }

  if (isRTKQueryError(error) && error?.status === 403) {
    return (
      <Flex className={styles["result"]} align="center" justify="center">
        <Result
          status={"403"}
          title="403"
          subTitle={
            <span className={styles["message"]}>
              У вас нет доступа к этому хранилищу. Обратитесь к владельцу, для
              того чтобы он предоставил вам доступ:{" "}
              <a
                target="_blank"
                href={`${error?.data?.type === "email" ? "mailto:" : "https://t.me/"}${error?.data?.contacts}`}
              >
                {error?.data?.type === "telegram" && "@"}
                {error?.data?.contacts}
              </a>
            </span>
          }
          extra={
            <Flex vertical>
              <Link to="/">
                <Button type="link">К списку хранилищ</Button>
              </Link>
            </Flex>
          }
        />
      </Flex>
    );
  }

  return <Storage />;
};

export default StorageContainer;
