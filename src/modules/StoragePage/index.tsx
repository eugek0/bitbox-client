import { FC } from "react";
import Storage from "@/components/Storage/Storage";
import styles from "../styles.module.scss";

const StoragePage: FC = () => {
  return (
    <div className={styles["page100vh"]}>
      <Storage />
    </div>
  );
};

export default StoragePage;
