import { FC } from "react";
import styles from "./styles.module.scss";
import { LogotypeProps } from "./types";
import { RiBox1Fill } from "react-icons/ri";

const Logotype: FC<LogotypeProps> = ({
  size = "middle",
  className,
  ...props
}) => {
  return (
    <RiBox1Fill
      {...props}
      className={`${styles["body"]} ${styles[size]} ${className ? className : ""}`}
    />
  );
};

export default Logotype;
