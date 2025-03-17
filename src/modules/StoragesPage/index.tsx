import { FC } from "react";
import Storages from "@/components/Storages";
import styles from "../styles.module.scss";

const StoragesPage: FC = () => {
  return (
    <div className={styles["page100vh"]}>
      <Storages />
    </div>
  );
};

export default StoragesPage;
