import { FC } from "react";
import StorageFileContainer from "@/containers/Storage/StorageFileContainer";
import styles from "../styles.module.scss";

const StorageFilePage: FC = () => {
  return (
    <div className={styles["page100vh"]}>
      <StorageFileContainer />
    </div>
  );
};

export default StorageFilePage;
