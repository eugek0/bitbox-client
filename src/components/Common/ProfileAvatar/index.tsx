import { FC } from "react";
import { Avatar, Popover } from "antd";
import ProfileMenuPopoverContainer from "@/containers/Common/ProfileMenuPopoverContainer";
import { ProfileAvatarProps } from "./types";
import styles from "./styles.module.scss";

const ProfileAvatar: FC<ProfileAvatarProps> = ({
  isPopoverOpened,
  handleTogglePopover,
  profile,
}) => {
  return (
    <Popover
      content={<ProfileMenuPopoverContainer />}
      trigger={["click"]}
      placement="bottomLeft"
      onOpenChange={handleTogglePopover}
      open={isPopoverOpened}
    >
      <Avatar
        className={`${styles["avatar"]} ${isPopoverOpened ? styles["avatar_active"] : ""}`}
        src={profile?.avatar}
        alt="avatar"
      />
    </Popover>
  );
};

export default ProfileAvatar;
