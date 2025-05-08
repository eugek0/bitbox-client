import { FC } from "react";
import { Button, Flex, Typography } from "antd";
import { AgreementLayoutProps } from "./types";
import styles from "./styles.module.scss";
import Logotype from "@/components/Common/Logotype";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";

const AgreementLayout: FC<AgreementLayoutProps> = ({ title, children }) => {
  return (
    <Flex className={`${styles["body"]} page100vh`} justify="center">
      <Flex className={styles["sheet"]} vertical>
        <Flex
          className={styles["header"]}
          align="center"
          justify="space-between"
        >
          <Flex align="center" gap={15}>
            <Link to="/auth/register">
              <Button icon={<ArrowLeftOutlined />} type="text">
                Назад
              </Button>
            </Link>
            <Typography.Title className={styles["title"]} level={3}>
              {title}
            </Typography.Title>
          </Flex>
          <Logotype size="large" />
        </Flex>
        <Flex className={styles["content"]} gap={15} vertical>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AgreementLayout;
