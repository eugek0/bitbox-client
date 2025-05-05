import { FC } from "react";
import ProfileContainer from "@/containers/ProfileContainer";
import styles from "./styles.module.scss";

const ProfilePage: FC = () => {
  return (
    <div className={`page100vh ${styles["body"]}`}>
      <ProfileContainer />
    </div>
  );
};

export default ProfilePage;
