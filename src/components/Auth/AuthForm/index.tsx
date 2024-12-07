import { FC } from "react";
import { AuthFormProps } from "./types";
import { Flex, Form } from "antd";
import styles from "./styles.module.scss";

const AuthForm: FC<AuthFormProps> = ({ children, form, onFinish }) => {
  return (
    <Flex className={styles["body"]} align="center" justify="center">
      <Flex className={styles["form-container"]}>
        <Form
          className={styles["form"]}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          {children}
        </Form>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
