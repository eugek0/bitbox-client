import { FC } from "react";
import { AuthFormProps } from "./types";
import { Flex, Form } from "antd";
import styles from "./styles.module.scss";

const AuthForm: FC<AuthFormProps> = ({ children, form, onFinish }) => {
  return (
    <Flex className={styles["body"]} align="center" justify="center" gap={100}>
      <Flex className={styles["form-container"]} gap={50} align="center">
        <iframe
          className={styles["iframe"]}
          src="/donut/index.html"
        />
        <Flex className={styles["form-container__form-wrapper"]}>
          <Form className={styles["form"]} onFinish={onFinish} form={form}>
            {children}
          </Form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
