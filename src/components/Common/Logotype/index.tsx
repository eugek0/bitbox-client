import { CloudFilled } from "@ant-design/icons";
import { FC } from "react";
import styles from "./styles.module.scss";
import { LogotypeProps } from "./types";

const Logotype: FC<LogotypeProps> = ({
  size = "middle",
  className,
  ...props
}) => {
  return (
    <CloudFilled
      {...props}
      className={`${styles["body"]} ${styles[size]} ${className}`}
    />
  );
};

export default Logotype;
