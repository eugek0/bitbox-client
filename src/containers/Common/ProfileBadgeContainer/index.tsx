import ProfileBadge from "@/components/Common/ProfileBadge";
import { useGetUserQuery } from "@/core/api";
import { FC } from "react";
import { ProfileBadgeContainerProps } from "./types";

const ProfileBadgeContainer: FC<ProfileBadgeContainerProps> = ({
  _id,
  email,
  login,
}) => {
  const { data: profile, isFetching } = useGetUserQuery({ _id, email, login });

  return (
    <ProfileBadge
      avatar={profile?.avatar}
      login={profile?.login}
      loading={isFetching}
    />
  );
};

export default ProfileBadgeContainer;
