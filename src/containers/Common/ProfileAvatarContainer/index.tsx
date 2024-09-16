import ProfileAvatar from "@/components/Common/ProfileAvatar";
import { useGetProfileQuery } from "@/containers/Auth/api";
import { FC } from "react";

const ProfileAvatarContainer: FC = () => {
  const { data } = useGetProfileQuery();

  return <ProfileAvatar profile={data!} />;
};

export default ProfileAvatarContainer;
