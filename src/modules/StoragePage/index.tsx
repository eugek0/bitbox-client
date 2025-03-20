import { FC } from "react";
import StorageContainer from "@/containers/Storage";
import styles from "../styles.module.scss";

const StoragePage: FC = () => {
  return (
    <div className={styles["page100vh"]}>
      <StorageContainer />
    </div>
  );
};

export default StoragePage;
