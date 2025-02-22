import { FC } from "react";
import { Modal, ModalProps } from "antd";
import styles from "./styles.module.scss";

const AppModal: FC<ModalProps> = ({ className, ...props }) => {
  return <Modal {...props} className={`${styles["body"]} ${className}`} />;
};

export default AppModal;
