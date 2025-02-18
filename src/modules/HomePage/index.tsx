import { FC } from "react";
import HomeContainer from "@/containers/Home";
import styles from "./styles.module.scss";

const HomePage: FC = () => {
  return (
    <div className={styles["body"]}>
      <HomeContainer />
    </div>
  );
};

export default HomePage;
