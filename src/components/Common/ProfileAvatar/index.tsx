import ProfileMenuPopoverContainer from "@/containers/Common/ProfileMenuPopoverContainer";
import { Avatar, Popover } from "antd";
import { FC } from "react";
import { ProfileAvatarProps } from "./types";

const ProfileAvatar: FC<ProfileAvatarProps> = ({ profile }) => {
  return (
    <Popover
      content={<ProfileMenuPopoverContainer />}
      trigger={["click"]}
      placement="bottomLeft"
    >
      <Avatar src={profile.avatar} alt="avatar" />
    </Popover>
  );
};

export default ProfileAvatar;
