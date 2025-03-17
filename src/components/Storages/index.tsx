import { FC } from "react";
import StoragesTableContainer from "@/containers/Storages/StoragesTableContainer";
import styles from "./styles.module.scss";

const Storages: FC = () => {
  return (
    <div className={styles["body"]}>
      <StoragesTableContainer />
    </div>
  );
};

export default Storages;
