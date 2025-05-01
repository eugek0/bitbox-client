import { FC } from "react";
import { Flex, Form } from "antd";
import { RecoverFormProps } from "./types";
import styles from "./styles.module.scss";

const RecoverForm: FC<RecoverFormProps> = ({ children, form, onFinish }) => {
  return (
    <Flex className={styles["body"]} align="center" justify="center" gap={100}>
      <Flex className={styles["form-container"]} gap={50} align="center">
        <Form className={styles["form"]} onFinish={onFinish} form={form}>
          {children}
        </Form>
      </Flex>
    </Flex>
  );
};

export default RecoverForm;
